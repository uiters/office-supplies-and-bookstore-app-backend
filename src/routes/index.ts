import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.routes';
import typeRoutes from './productType.route';
import categoryRoutes from './category.route';
import productRoutes from './product.route';
import invoiceRoutes from './invoice.route';
import invoiceDetailRoutes from './invoice-detail.route';
export class Routes {
    public init(app: express.Application): void {
        app.use('/api/user', userRoutes);
        app.use('/api/auth', authRoutes);
        app.use('/api/product-type', typeRoutes);
        app.use('/api/category', categoryRoutes);
        app.use('/api/product', productRoutes);
        app.use('/api/invoice', invoiceRoutes);
        app.use('/api/invoice-detail', invoiceDetailRoutes);
    }
}
