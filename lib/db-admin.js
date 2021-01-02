import db from "./firebase-admin";

export async function getAllFeedback(siteId) {
  try {
    const feedbackRef = db.collection("feedback");
    const snapshot = await feedbackRef
      .where("siteId", "==", siteId)
      .orderBy("createdAt", "desc")
      .get();

    const feedback = [];

    if (snapshot.empty) {
      console.log("No matching documents.");
      return feedback;
    }

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  try {
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

    return { sites };
  } catch (error) {
    return { error };
  }
}
