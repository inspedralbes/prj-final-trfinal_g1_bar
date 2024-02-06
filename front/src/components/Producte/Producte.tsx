'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export function Producte({ idProduct, imgProduct, nameProduct, priceProduct }: { idProduct: number, imgProduct: string, nameProduct: string, priceProduct: number }) {

    return (
        <div className="bar-product">
            <Link href={`/productes/${idProduct}`}>
                <div className="bar-product-header">
                    <img
                        className="bar-product-img"
                        src={imgProduct}
                        alt={"img_" + nameProduct}
                        />
                    <div className="bar-product-info">
                        <span className="bar-product-name">{nameProduct}</span>
                        <span className="bar-product-price">{priceProduct}€</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}