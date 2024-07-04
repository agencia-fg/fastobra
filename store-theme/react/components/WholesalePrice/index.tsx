//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context'
import responsePlaceholder from './helpers/responsePlaceholder.json'
import styles from './style.css'

const promotionId = "e9f499ef-5ca9-41ba-b4e6-c8e4b173701c"

const WholesalePrice = () => {
    const product = useProduct()?.product    
    const [hasWholesalePrice, setHasWholesalePrice] = useState(false)
    const [percentualDiscountValue, setPercentualDiscountValue] = useState()
    const [quantityToAffectBuyTogether, setquantityToAffectBuyTogether] = useState()
    const [lowerInstallment, setLowerInstallment] = useState([])
    const clusters = product?.productClusters || []
    const commertialOffer  = product?.items[0].sellers[0].commertialOffer
    const listPrice = commertialOffer?.ListPrice || 0
    const bestPrice = commertialOffer?.Price || 0
    const priceWithDiscount = (bestPrice).toLocaleString('pt-br') 

    useEffect(() => {
        const fetchData = async () => {
            const { response } = await fetchpromotion();
            if (!response) return

            setPercentualDiscountValue(response.percentualDiscountValue)
            setquantityToAffectBuyTogether(response.minimumQuantityBuyTogether)
        };
    
        const hasWholePrice = clusters.filter(i => {return i.id === "305"})
        
        if (!hasWholePrice.length) return (setHasWholesalePrice(false), console.log("NAO TEM"))
        console.log(hasWholePrice, "hasWholePrice")
        setHasWholesalePrice(true)  
        
  
        const lowerInstallmentsArr = commertialOffer?.Installments.sort((a,b) => {
            if (a.Value > b.Value) return 1
            if (a.Value < b.Value) return -1
            return 0;
        })

        lowerInstallmentsArr?.forEach((item, index) => {
            if (item.PaymentSystemName.includes("Pix") || item.PaymentSystemName.includes("Boleto Bancário") || item.PaymentSystemName.includes("Vale")) {
                lowerInstallmentsArr.splice(index, 1)
            }
        })

        setLowerInstallment(lowerInstallmentsArr[0])

        fetchData();
    }, []);

    const fetchpromotion = async () => {
        try {
            const response = await fetch(`/_v/promotion/`, {
                method: "POST",
                body: JSON.stringify({
                    promotionId : promotionId
                })
                })

                const json = await response.json()
                console.log(json, "response")
                if (!response.ok) return false

                return json

        } catch(err) {
            console.log(err, "error catch")
            return false
        }
    }

    const ConvertToBRL = (value) => {
        return value?.toLocaleString("pt-br", {
            "style" : "currency", "currency" : "BRL"
        })
    }

    const wholesalePrice = (bestPrice) - (percentualDiscountValue * bestPrice / 100)
    const wholesalePriceConverted = ConvertToBRL(wholesalePrice)
    const pixDiscountPercentage = 3
    const spotPricePix = ConvertToBRL((wholesalePrice) -  (pixDiscountPercentage * wholesalePrice / 100))

    if (!hasWholesalePrice) return <></>
    
    return <>
        <div className={styles.wrapperPrice}>
            <div className={styles.priceHead}>
                <p className={styles.priceTitleBlue}> Preço de atacado </p>
                <p className={styles.priceTitleOrange}> ACIMA DE {quantityToAffectBuyTogether} UNIDADES </p>
                <em className={styles.line}></em>
            </div>
            <div className={styles.wrapp_price__middle}>
                <span className={styles.listPrice}>De R$ {bestPrice}  </span>
                <span className={styles.bestPrice}>Por {wholesalePriceConverted} <span className={styles.unityIndicator}>un.</span>  </span>            
            </div>
                <span className={styles.spotPricePixContainer}> ou {spotPricePix} no <span style={{color: "#FF6344", fontWeight: "bold"}}> PIX </span></span>
                <span className={styles.spotPricePixContainer}> ou em até {lowerInstallment?.NumberOfInstallments}x de {lowerInstallment?.Value}</span>
        </div>
       
    </>
}

export default WholesalePrice