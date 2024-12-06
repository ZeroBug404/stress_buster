import admin from "firebase-admin";

async function decodeAuthToken(token: string) {
  try {
    const Id = token?.split(" ")[1];
    // console.log("em:", Id);
    const decodedValue = await admin.auth().verifyIdToken(Id);
    const email = decodedValue.email;
    // console.log("@@", email);
    return email;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(String(error));
    }
  }
}

export { decodeAuthToken };