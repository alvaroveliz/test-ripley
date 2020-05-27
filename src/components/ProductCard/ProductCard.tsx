import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import { Grid, Box, Typography, Button, Link, Breadcrumbs } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;

interface RouteParams {
    id: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        thumbnails: {},
        selectedThumbnail: {
            width: '100%',
        },
        productName: {
            fontSize: '2em',
            fontWeight: 'bold',
        },
        productSku: {
            fontSize: '1.2em',
            color: '#999',
        },
        productPrice: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        productDescription: {
            color: '#999',
        },
        redPrice: {
            color: '#e75353',
            fontWeight: 'bold',
        },
        purplePrice: {
            color: '#70578b',
            fontWeight: 'bold',
        },
        discountTag: {
            backgroundColor: '#E75353',
            color: 'white',
            fontSize: '1.2em',
            fontWeight: 'bold',
            borderRadius: '4px',
            padding: '2px',
        },
        buyProduct: {
            backgroundColor: '#e75353',
            color: 'white',
        },
        boxDescription: {
            borderTop: '1px solid #DDD',
        },
    }),
);

const renderHTML = (rawHTML: string) => React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } });

const ProductCard: React.FC<Props> = ({ match }): React.ReactElement => {
    const [product, setProduct] = useState();
    const classes = useStyles();
    const { params } = match;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiEndPoint}/api/products/${params.id}/show`);
                setProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    });

    return (
        <>
            {product && (
                <div>
                    <Box p={4}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href="/">
                                Catálogo
                            </Link>
                            <Typography color="textPrimary">{product.name}</Typography>
                        </Breadcrumbs>
                    </Box>
                    <Grid container spacing={4} justify="center">
                        <Grid item lg={4}>
                            <div className={classes.thumbnails}>
                                <img src={product.images[0]} alt={product.name} className={classes.selectedThumbnail} />
                            </div>
                        </Grid>
                        <Grid item lg={4}>
                            <Box p={2}>
                                <Typography className={classes.productName}>{product.name}</Typography>
                                <Typography className={classes.productSku} variant="overline">
                                    SKU: {product.partNumber}
                                </Typography>
                            </Box>
                            <Box p={2}>
                                {product.prices.formattedListPrice !== product.prices.formattedOfferPrice && (
                                    <div className={classes.productPrice}>
                                        <Typography>Precio</Typography>
                                        <Typography>{product.prices.formattedListPrice}</Typography>
                                    </div>
                                )}
                                <div className={classes.productPrice}>
                                    <Typography className={classes.redPrice}>Precio Internet</Typography>
                                    <Typography className={classes.redPrice}>
                                        {product.prices.formattedOfferPrice}
                                    </Typography>
                                </div>
                                {product.prices.discountPercentage > 0 && (
                                    <div className={classes.productPrice}>
                                        <Typography>Descuento</Typography>
                                        <Typography className={classes.discountTag}>
                                            -{product.prices.discountPercentage} %
                                        </Typography>
                                    </div>
                                )}
                                {product.prices.ripleyPuntos && (
                                    <div className={classes.productPrice}>
                                        <Typography className={classes.purplePrice}>Acumulas</Typography>
                                        <Typography className={classes.purplePrice}>
                                            {product.prices.ripleyPuntos} Ripley Puntos GO
                                        </Typography>
                                    </div>
                                )}
                            </Box>
                            <Box>
                                <Button
                                    fullWidth={true}
                                    className={classes.buyProduct}
                                    href={`https://simple.ripley.cl${product.url}`}
                                >
                                    Comprar en Ripley
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} justify="center">
                        <Grid item lg={8}>
                            <Box p={2} className={classes.boxDescription}>
                                <Typography variant="overline">Descripción</Typography>
                                <Typography variant="body2" className={classes.productDescription}>
                                    {renderHTML(product.longDescription)}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    );
};

export default ProductCard;
