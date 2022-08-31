const moment = require("moment");

const {
  getAllCategory,
  getAllSubCategory,
} = require("../../models/expenseCategories");
const { getTransactionsMonthYearList } = require("../../models/transaction");

let dashboardController = {};

dashboardController.index = async (req, res) => {
  let data = {
    categories: [],
    todaysDate: moment().format("YYYY-MM-DD"),
    currentMonthYear: req.query?.month_year || moment().format("YYYY-MM"),
  };
  try {
    const {
      data: { monthYearList },
    } = await getTransactionsMonthYearList(req.session.userData.id);

    const {
      data: { category },
    } = await getAllCategory();

    const {
      data: { subCategory },
    } = await getAllSubCategory(req.session.userData.id, data.currentMonthYear);

    const categorySubCategoryData = category.map((cat) => ({
      ...cat,
      subCategory: subCategory.filter((subCat) => subCat.parent_id === cat.id),
    }));
    data.categories = categorySubCategoryData;
    data.monthYearList = monthYearList.map((val) => ({
      id: moment(val.dateMonthYear).format("YYYY-MM"),
      name: moment(val.dateMonthYear).format("MMMM, YYYY"),
    }));
  } catch (error) {
    console.log("dashboard error", error);
  }
  res.render("dashboard", { title: "Dashboard", data });
};

dashboardController.logout = (req, res) => {
  delete req.session.token;
  delete req.session.userData;
  return res.redirect("/admin");
};

module.exports = dashboardController;
