import { Response } from "express";
import TransactionModel from "../../modal/transactionModel";
import UserAccountModel from "../../modal/userAccountModel";

const createTransaction = async (req, res: Response) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `User Details is required.`,
      });
    }

    if (!user.isactive === false) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `User Account is not active required.`,
      });
    }

    const requestData = req.body;
    const sourceAccount = requestData.transfer_from.account_number;
    const transferToAccount = requestData.transfer_to.account_number;
    const requestedTransferAmount = requestData.amount;

    const userAccount = await UserAccountModel.find({
      account_no: sourceAccount,
    });

    console.log(userAccount);

    if (!userAccount) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: `Account ${sourceAccount} not found, Source account details are not valid.`,
      });
    }

    // const userAvailableBalance = Number(userAccount.balance);

    // if (requestedTransferAmount > userAvailableBalance) {
    //   return res.status(400).json({
    //     status: 400,
    //     success: false,
    //     message: `Account ${sourceAccount} not have the sufficient balance.`,
    //   });
    // }

    const transferAccount = await UserAccountModel.findOne({
      account_no: sourceAccount,
    });

    const transferAccountAvailableBalance = transferAccount.balance;

    // const newTransaction = new TransactionModel({
    //   user_id: user._id,
    //   account_id: userAccount._id,
    //   account_type: requestData.account_type,
    //   transfer_from: requestData.transfer_from,
    //   transfer_to: requestData.transfer_to,
    //   amount: requestedTransferAmount,
    //   transaction_type: requestData.transaction_type,
    //   transaction_method: requestData.transaction_method,
    //   transaction_status: "processing",
    //   transaction_date: Date.now(),
    //   iscredit: false,
    //   isdebit: true,
    //   iscompleted: false,
    //   iscanceled: false,
    //   isprocessing: true,
    // });

    // await newTransaction.save();

    // if (!transferAccount) {
    //   return res.status(400).json({
    //     status: 400,
    //     success: false,
    //     message: `provided Account information is not from the our bank trying to fetch account information.`,
    //   });
    // } else {
    //   const senderUpdatedBalance =
    //     Number(userAvailableBalance) - Number(requestedTransferAmount);

    //   const senderAccount = new UserAccountModel({
    //     user_id: user._id,
    //     user_address_id: userAccount.user_address_id,
    //     account_type: userAccount.account_type,
    //     branch_id: userAccount.branch_id,
    //     account_no: sourceAccount,
    //     balance: senderUpdatedBalance,
    //     transction_amount: requestedTransferAmount,
    //     transction_id: newTransaction._id,
    //     transction_type: "db",
    //     transction_date: newTransaction.transaction_date,
    //   });

    //   await senderAccount.save();

    //   //   const reciverUpdatedBalance =
    //   //     Number(transferAccountAvailableBalance) +
    //   //     Number(requestedTransferAmount);

    //   //   //   const receiverAccount = new UserAccountModel({
    //   //   //     user_id: transferAccount.user_id,
    //   //   //     user_address_id: transferAccount.user_address_id,
    //   //   //     account_type: transferAccount.account_type,
    //   //   //     branch_id: transferAccount.branch_id,
    //   //   //     account_no: transferToAccount,
    //   //   //     balance: reciverUpdatedBalance,
    //   //   //     transction_amount: requestedTransferAmount,
    //   //   //     transction_id: newTransaction._id,
    //   //   //     transction_type: "cr",
    //   //   //     transction_date: newTransaction.transaction_date,
    //   //   //   });

    //   //   //   await receiverAccount.save();

    //   res.status(200).json({
    //     type: "success",
    //     status: 200,
    //     message: "Transaction Created successfully",
    //     data: { newTransaction, senderAccount },
    //   });
    // }
    res.status(200).json({
      type: "success",
      status: 200,
      message: "Transaction Created successfully",
      //   data: { newTransaction, senderAccount },
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      success: false,
      errors: error,
      msg: "Something went wrong. Please try again",
    });
  }
};

const calculateAccountBalance = async (req, res) => {
  try {
    const user = JSON.parse(JSON.stringify(req.user));

    // const sum = UserAccountModel.aggregate([
    //   { $match: { user_id: user._id } },
    //   { $group: { _id: "user._id", TotalSum: { $sum: "$balance" } } },
    // ]);

    // const sum = UserAccountModel.aggregate([
    //   { $group: { _id: "$UserAccountModel", sum_val: { $sum: "$balance" } } },
    // ]);

    // console.log(
    //   UserAccountModel.aggregate([
    //     { $group: { transction_type: "$transction_type", sum_val: { $sum: "$balance" } } },
    //   ])
    // );

    const cond = [
      {
        $facet: {
          debit: [
            {
              $match: {
                transction_type: "db",
              },
            },
            {
              $count: "count",
            },
          ],
          credit: [
            {
              $match: { transction_type: "cr" },
            },
            {
              $count: "count",
            },
          ],
        },
      },
    ];

    const transactionList = await UserAccountModel.aggregate(cond);

    // const transactionList = await UserAccountModel.find({
    //   user_id: user._id,
    // });

    // let balance = 0;

    console.log("transactionList", transactionList[0]);

    res.status(200).json({
      status: 200,
      success: true,
      message: `${user.name} available balance is `,
      data: transactionList,
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      success: false,
      errors: error,
      msg: "Something went wrong. Please try again",
    });
  }
};

export default {
  createTransaction,
  calculateAccountBalance,
};
