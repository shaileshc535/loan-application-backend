import { Schema, model, PopulatedDoc } from "mongoose";
import { IUser } from "./user";
import { IUserAccount } from "./userAccountModel";

enum TransactionType {
  CREDIT = "cr",
  DEBIT = "db",
}

enum TransactionMethod {
  ONLINE = "online",
  OFFLINE = "offline",
  CHECK = "check",
  UPI = "upi",
  NETBANKING = "net-banking",
}

enum TransactionStatus {
  COMPLETE = "complete",
  CANCEL = "cancel",
  PROCESSING = "processing",
}

export interface ITransaction {
  user_id: PopulatedDoc<IUser>;
  account_id: PopulatedDoc<IUserAccount>;
  transfer_from: {
    account_number: string;
    ifsc_code: string;
    bank_name: string;
  };
  transfer_to: {
    account_number: string;
    ifsc_code: string;
    bank_name: string;
  };
  amount: number;
  transaction_type: TransactionType;
  transaction_method: TransactionMethod;
  transaction_status: TransactionStatus;
  transaction_date: string;
  iscredit: boolean;
  isdebit: boolean;
  iscompleted: boolean;
  iscanceled: boolean;
  isprocessing: boolean;
  isactive: boolean;
  isdeleted: boolean;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    account_id: {
      type: Schema.Types.ObjectId,
      ref: "user_account",
    },
    amount: {
      type: Number,
      required: true,
    },
    transfer_from: {
      account_number: {
        type: String,
      },
      ifsc_code: {
        type: String,
      },
      bank_name: {
        type: String,
      },
    },
    transfer_to: {
      account_number: {
        type: String,
      },
      ifsc_code: {
        type: String,
      },
      bank_name: {
        type: String,
      },
    },
    transaction_type: {
      type: String,
      enum: TransactionType,
    },
    transaction_method: {
      type: String,
      enum: TransactionMethod,
    },
    transaction_status: {
      type: String,
      enum: TransactionStatus,
    },
    transaction_date: {
      type: String,
    },
    iscredit: {
      type: Boolean,
      default: false,
    },
    isdebit: {
      type: Boolean,
      default: false,
    },
    iscompleted: {
      type: Boolean,
      default: false,
    },
    iscanceled: {
      type: Boolean,
      default: false,
    },
    isprocessing: {
      type: Boolean,
      default: false,
    },
    isactive: {
      type: Boolean,
      default: false,
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.virtual("user", {
  ref: "user",
  localField: "user_id",
  foreignField: "_id",
});

TransactionSchema.virtual("user_account", {
  ref: "user_account",
  localField: "account_id",
  foreignField: "_id",
});

const transaction = model("transaction", TransactionSchema);

export default transaction;
