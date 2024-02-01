require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { Clerk } = require("@clerk/clerk-sdk-node");
// To read CLERK_API_KEY
const userdb = require("./model/userSchema");
const OrganizationDb = require("./model/organization.model");
const clerk = new Clerk({
  secretKey: "sk_test_wAUGTfa7aM564EURzkuYhvST22SFqeDrcPn08Ai9s6",
});
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
// Use the lax middleware that returns an empty auth object when unauthenticated
mongoose
  .connect(
    "mongodb+srv://rahul:GrXn32L6uq02SYVd@cluster0.afu5ge6.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
app.post("/user", async (req, res) => {
  console.log("here");
  try {
    const { sessionId } = req.body;
    const session = await clerk.sessions.getSession(sessionId);
    const userId = session.userId;
    if (!userId) throw new Error("User not found.");
    console.log("userID", userId);
    const clerkUser = await clerk.users.getUser(userId);
    console.log("clerk user", clerkUser);
    // Rest of your code...
    let organization = await OrganizationDb.findOne({
      email: clerkUser.emailAddresses[0].emailAddress,
    });
    if (organization) {
      console.log("user", organization);
      // Update user data if necessary
      organization.clerkUserId = clerkUser.id;
      organization.imageUrl = clerkUser.imageUrl;

      // Save the updated organization
      await organization.save();
      console.log("updated organization", organization);
      res.status(200).send(organization);
    } else {
      const newOrganization = await new OrganizationDb({
        clerkUserId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        imageUrl: clerkUser.imageUrl,
        name: clearkUser.firstName + " " + clerkUser.lastName,
      }).save();
      console.log("newOrganization", newOrganization);
      res.status(200).json(newOrganization);
      // ... any other fields from the Clerk user object
      // });
      // await newOrganization.save();
      // res.send(newOrganization);
    }
  } catch (error) {
    console.error("Error storing user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
