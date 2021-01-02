import db from "./firebase-admin";

export async function getAllFeedback(siteId) {
  const feedbackRef = db.collection("feedback");
  const snapshot = await feedbackRef.where("siteId", "==", siteId).get();

  const feedback = [];

  if (snapshot.empty) {
    console.log("No matching documents.");
    return feedback;
  }

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return feedback;
}

export async function getAllSites(siteId) {
  const sitesRef = db.collection("sites");
  const snapshot = await sitesRef.orderBy("createdAt", "desc").get();

  const sites = [];

  if (snapshot.empty) {
    console.log("No matching documents.");
    return sites;
  }

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return sites;
}
