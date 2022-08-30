const {
  checkCategoryID,
  checkSubCategoryID,
} = require("../../models/expenseCategories");

const { checkTransactionID } = require("../../models/transaction");

module.exports = {
  add: {
    cat_id: {
      toInt: true,
      custom: {
        options: async (value, { req, location, path }) => {
          if (!value) {
            return Promise.reject("Please provide category");
          } else {
            const { data } = await checkCategoryID(value);
            if (!data.id) {
              return Promise.reject("Invalid category ID");
            } else {
              return true;
            }
          }
        },
      },
    },
    sub_cat_id: {
      toInt: true,
      custom: {
        options: async (value, { req, location, path }) => {
          if (!value) {
            return Promise.reject("Please provide sub category");
          } else {
            const { data } = await checkSubCategoryID(value);
            if (!data.id) {
              return Promise.reject("Invalid sub category ID");
            } else {
              return true;
            }
          }
        },
      },
    },
    transaction_date: {
      trim: true,
      isDate: {
        errorMessage: "Please provide valid date (DD/MM/YYYY)",
      },
    },
    amount: {
      custom: {
        options: async (value, { req, location, path }) => {
          const amountRegx = /^\d+(\.\d{1,2})?$/;
          if (!value) {
            return Promise.reject("Please enter amount ex.10.00");
          } else if (!amountRegx.test(value)) {
            return Promise.reject("Please provide valid amount ex.10.00");
          } else {
            return true;
          }
        },
      },
    },
    description: {
      trim: true,
      escape: true,
    },
  },
  save: {
    t_id: {
      toInt: true,
      custom: {
        options: async (value, { req, location, path }) => {
          if (!value) {
            return Promise.reject("Please provide transaction ID.");
          } else {
            const { data } = await checkTransactionID(value);
            if (!data.id) {
              return Promise.reject("Invalid transaction ID");
            } else {
              return true;
            }
          }
        },
      },
    },
    transaction_date: {
      trim: true,
      isDate: {
        errorMessage: "Please provide valid date (DD/MM/YYYY)",
      },
    },
    amount: {
      custom: {
        options: async (value, { req, location, path }) => {
          const amountRegx = /^\d+(\.\d{1,2})?$/;
          if (!value) {
            return Promise.reject("Please enter amount ex.10.00");
          } else if (!amountRegx.test(value)) {
            return Promise.reject("Please provide valid amount ex.10.00");
          } else {
            return true;
          }
        },
      },
    },
    description: {
      trim: true,
      escape: true,
    },
  },
};
