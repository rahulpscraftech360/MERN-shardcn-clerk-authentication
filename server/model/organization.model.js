const mongoose = require("mongoose");
const validator = require("validator");

const { toJSON, paginate } = require("./plugins");

const organizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    googleId: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      postalCode: {
        type: String,
        trim: true,
      },
    },
    isTrial: {
      type: Boolean,
      default: true, // set to true by default, assuming organizations start with a trial
    },
    planEndDate: {
      type: Date,
    },
    subscriptions: [
      {
        subscriptionId: { type: String },
        clientSecret: { type: String },
        customerId: { type: String },
        // add other fields as needed
      },
    ],
    stripeCustomerId: {
      type: String,
    },
    stripeId: {
      type: String,
    },
    clerkUserId: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    Invoice: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add plugin that converts mongoose to JSON and enables pagination
organizationSchema.plugin(toJSON);
organizationSchema.plugin(paginate);

/**
 * @typedef Organization
 */
const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
