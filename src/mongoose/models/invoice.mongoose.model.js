const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: [true, "User id is required"],
        },
        total: {
            type: Number,
            required: [true, "total is required"],
        },
        addressId: {
            type: mongoose.Types.ObjectId,
            required: [true, "Address id is required"],
        },
    },
    { toJSON: { virtuals: true }, timestamps: true }
);

InvoiceSchema.virtual("getInvoiceDetail", {
    ref: "invoice-detail",
    localField: "_id",
    foreignField: "invoiceId",
});

InvoiceSchema.virtual("getAddress", {
    ref: "address",
    localField: "addressId",
    foreignField: "_id"
})

InvoiceSchema.pre("find", function(next){
    this.populate({
        path: "getAddress",
        select: '-_id'
    })
    next();
});

InvoiceSchema.query.getInvoiceById = function (id) {
    return this.where({ $or: [{ userId: id }, { _id: id }] });
};

InvoiceSchema.statics.createInvoice = function (invoice) {
    if(invoice.userId !== mongoose.Types.ObjectId && invoice.addressId !== mongoose.Types.ObjectId)
    return new Invoice({
        userId: invoice.userId,
        total: invoice.total,
        addressId: invoice.addressId,
    });
};

const Invoice = mongoose.model("invoice", InvoiceSchema);

module.exports = Invoice;
