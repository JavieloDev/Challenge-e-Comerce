// product.model.ts
export interface Product {
  id: number; // Identificador único del producto
  title: string; // Título del producto
  price: number; // Precio del producto
  description: string; // Descripción del producto
  category: string; // Categoría a la que pertenece el producto
  image: string; // URL de la imagen del producto
  rating: {
    rate: number; // Calificación del producto
    count: number; // Número de reseñas
  };
}
