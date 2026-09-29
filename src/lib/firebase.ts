import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  getDocs,
  collection,
  query,
  orderBy,
  deleteDoc
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { StoredReportItem, UserProfile } from "../types";

// Initialize Firebase App with user's project config
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore with the provisioned database ID (CRITICAL: skill requirement)
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Error handling conforming to skill specification
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write"
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testFirestoreConnection();

// User profile synchronization
export async function syncUserProfileToFirestore(userProfile: UserProfile): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== userProfile.id) {
    return;
  }
  const path = `users/${userProfile.id}`;
  try {
    const userDocRef = doc(db, "users", userProfile.id);
    const existingSnap = await getDoc(userDocRef);
    const now = new Date().toISOString();
    const createdAt =
      existingSnap.exists() && existingSnap.data()?.createdAt
        ? existingSnap.data().createdAt
        : now;

    await setDoc(
      userDocRef,
      {
        userId: userProfile.id,
        email: userProfile.email || auth.currentUser.email || `${userProfile.phone || userProfile.id}@gramvyapar.gov.in`,
        displayName: userProfile.name || auth.currentUser.displayName || "Entrepreneur",
        phone: userProfile.phone || "",
        role: userProfile.role || "entrepreneur",
        state: userProfile.state || "",
        district: userProfile.district || "",
        udyamNumber: userProfile.udyamNumber || "",
        createdAt,
        updatedAt: now
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserProfileFromFirestore(userId: string): Promise<UserProfile | null> {
  if (!auth.currentUser || auth.currentUser.uid !== userId) {
    return null;
  }
  const path = `users/${userId}`;
  try {
    const docSnap = await getDoc(doc(db, "users", userId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: data.userId || userId,
        name: data.displayName || data.email?.split("@")[0] || "Entrepreneur",
        phone: data.phone || "",
        email: data.email || "",
        role: data.role || "entrepreneur",
        state: data.state || "",
        district: data.district || "",
        udyamNumber: data.udyamNumber || "",
        isLoggedIn: true,
        avatarColor: "bg-blue-600"
      };
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

// User reports in Firestore
export async function saveReportToFirestore(userId: string, report: StoredReportItem): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== userId) {
    return;
  }
  const path = `users/${userId}/reports/${report.id}`;
  try {
    const reportRef = doc(db, "users", userId, "reports", report.id);
    await setDoc(reportRef, {
      id: report.id,
      userId,
      location: report.location || "",
      businessCategory: report.businessCategory || "",
      marginCapital: Number(report.marginCapital) || 0,
      projectCost: Number(report.projectCost) || 0,
      loanEligibility: Number(report.loanEligibility) || 0,
      schemeName: report.schemeName || "",
      phone: report.phone || "",
      applicantName: "",
      reportData: report.reportData || {},
      createdAt: report.timestamp || new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function getUserReportsFromFirestore(userId: string): Promise<StoredReportItem[]> {
  if (!auth.currentUser || auth.currentUser.uid !== userId) {
    return [];
  }
  const path = `users/${userId}/reports`;
  try {
    const q = query(collection(db, "users", userId, "reports"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const items: StoredReportItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const d = docSnap.data();
      items.push({
        id: d.id || docSnap.id,
        phone: d.phone || "",
        timestamp: d.createdAt || new Date().toISOString(),
        location: d.location || "",
        businessCategory: d.businessCategory || "",
        marginCapital: d.marginCapital || 0,
        projectCost: d.projectCost || 0,
        loanEligibility: d.loanEligibility || 0,
        schemeName: d.schemeName || "",
        reportData: d.reportData
      });
    });
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// User feedback in Firestore
export async function saveFeedbackToFirestore(
  userId: string,
  feedback: {
    id: string;
    rating: number;
    tags: string[];
    comment?: string;
    businessCategory?: string;
    location?: string;
  }
): Promise<void> {
  if (!auth.currentUser || auth.currentUser.uid !== userId) {
    return;
  }
  const path = `users/${userId}/feedbacks/${feedback.id}`;
  try {
    const feedbackRef = doc(db, "users", userId, "feedbacks", feedback.id);
    await setDoc(feedbackRef, {
      id: feedback.id,
      userId,
      rating: feedback.rating,
      tags: feedback.tags || [],
      comment: feedback.comment || "",
      businessCategory: feedback.businessCategory || "",
      location: feedback.location || "",
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
export type { FirebaseUser };
