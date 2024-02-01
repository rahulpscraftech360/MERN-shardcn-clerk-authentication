require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const PORT = 3001;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");
const OrganizationDb = require("./model/organization.model");
const morgan = require("morgan");
const clientid =
  "869881604300-bp6ncrh0u0qarqi6hp6q6p9s7cjul4lo.apps.googleusercontent.com";
const clientsecret = "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";

app.use(cors());
app.use(express.json());

// setup session
app.use(
  session({
    secret: "YOUR SECRET KEY",
    resave: false,
    saveUninitialized: true,
  })
);

// setuppassport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let organization = await OrganizationDb.findOne({
          email: profile.email,
        });
        if (organization) {
          console.log("already present the user");
        }
        console.log("userrrr", organization);
        if (!organization) {
          organization = new OrganizationDb({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await organization.save();
          console.log("saved org", organization);
        }
        console.log("hereee");
        return done(null, organization);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((organization, done) => {
  done(null, organization);
});

passport.deserializeUser((organization, done) => {
  done(null, organization);
});

// initial google ouath login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get("/login/success", async (req, res) => {
  console.log("first,", req.user);
  if (req.user) {
    res.status(200).json({ message: "user Login", organization: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3001");
  });
});

app.listen(PORT, () => {
  console.log(`server start at port no ${PORT}`);
});
