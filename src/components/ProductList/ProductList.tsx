import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        product: {
            height: 360,
        },
        productDiscount: {
            backgroundColor: '#E75353',
            color: 'white',
            fontSize: '1.2em',
            fontWeight: 'bold',
            borderRadius: '4px',
            padding: theme.spacing(1),
            position: 'absolute',
            right: '10px',
            top: '10px',
        },
        productThumbnail: {
            textAlign: 'center',
            paddingBottom: '20px',
        },
        productThumbnailImage: {
            height: 215,
        },
        productTitle: {
            fontSize: '1.2em',
        },
        productListPrice: {
            fontSize: '1em',
        },
        productOfferPrice: {
            fontSize: '1.2em',
            color: '#e75353',
            fontWeight: 'bold',
        },
    }),
);

interface Props extends RouteComponentProps {}

const ProductList: React.FC<Props> = ({ history }): React.ReactElement => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiEndPoint}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                {products &&
                    products.map((product: any) => {
                        return (
                            <Grid item lg={4} xs={12} key={product.uniqueID}>
                                <Card>
                                    <CardActionArea
                                        className={classes.product}
                                        onClick={() => {
                                            history.push(`/${product.partNumber}/view`);
                                        }}
                                    >
                                        <CardContent>
                                            {product.prices.discountPercentage > 0 && (
                                                <div className={classes.productDiscount}>
                                                    -{product.prices.discountPercentage} %
                                                </div>
                                            )}
                                            <div className={classes.productThumbnail}>
                                                <img
                                                    src={product.fullImage}
                                                    alt={product.name}
                                                    className={classes.productThumbnailImage}
                                                />
                                            </div>

                                            <Typography className={classes.productTitle}>{product.name}</Typography>
                                            {product.prices.listPrice !== product.prices.offerPrice && (
                                                <Typography color="textSecondary" className={classes.productListPrice}>
                                                    {product.prices.formattedListPrice}
                                                </Typography>
                                            )}
                                            <Typography className={classes.productOfferPrice}>
                                                {product.prices.formattedOfferPrice}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
            </Grid>
        </>
    );
};

export default withRouter(ProductList);
