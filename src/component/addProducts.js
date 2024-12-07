import React, { useState } from 'react';
import { storage, db } from './firebase-config';  
import "../App.css";

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // Types d'images autorisés

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        } else {
            setProductImg(null);
            setError('Veuillez sélectionner un fichier avec une image valide (jpg ou png)');
        }
    };

    // Fonction pour ajouter un produit
    const addProduct = (e) => {
        e.preventDefault();
        if (!productImg) {
            setError('L\'image est obligatoire');
            return;
        }
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => {
            setError(err.message);
        }, () => {
            storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                db.collection('Products').add({
                    productName,
                    productPrice: Number(productPrice),
                    productImg: url,
                }).then(() => {
                    setProductName('');
                    setProductPrice(0);
                    setProductImg(null);
                    setError('');
                    document.getElementById('file').value = '';  // Reset file input
                }).catch(err => {
                    setError(err.message);
                });
            });
        });
    };

    return (
        <div className="container">
            <br />
            <h2>Ajouter un Produit</h2>
            <hr />
            <form autoComplete="off" className="form-group" onSubmit={addProduct}>
                <label htmlFor="product-name">Nom du Produit</label>
                <input
                    type="text"
                    className="form-control"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <br />
                <label htmlFor="product-price">Prix du Produit</label>
                <input
                    type="number"
                    className="form-control"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
                <br />
                <label htmlFor="product-img">Image du Produit</label>
                <input
                    type="file"
                    className="form-control"
                    id="file"
                    required
                    onChange={productImgHandler}
                />
                <br />
                <button type="submit" className="btn btn-success btn-md mybtn">Ajouter</button>
            </form>
            {error && <span className="error-msg">{error}</span>}
        </div>
    );
};

export default AddProduct;  // Exportation par défaut
