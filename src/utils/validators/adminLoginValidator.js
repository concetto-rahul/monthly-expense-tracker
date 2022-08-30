module.exports = {
  email: {
    trim: true,
    isEmail: {
      errorMessage: "Invalid email address.",
    },
  },
  password: {
    trim: true,
    isLength: {
      errorMessage: "Password should be at least 7 chars long",
      options: { min: 7 },
    },
  },
};
