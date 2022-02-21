import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import useShippingMethodStep from '@magento/peregrine/lib/talons/CheckoutPage/ShippingMethod/useShippingMethodStep';
import ScrollAnchor from '../../ScrollAnchor/scrollAnchor';
import StepCounter from '../StepCounter';
import { useCheckoutStepContext } from '../checkoutSteps';
import ShippingMethod from './shippingMethod';

const ShippingInformationStep = (props) => {
    const {
        isUpdating,
        setIsUpdating,
        stepKey,
        cartItems
    } = props;

    const {
        setStepVisibility,
        handleNextStep,
        isStepVisited,
        loading
    } = useCheckoutStepContext();

    const {
        handleDone,
        handleSuccess,
        shippingMethodRef,
        shouldDisplay
    } = useShippingMethodStep({
        stepKey,
        setStepVisibility,
        handleNextStep,
        cartItems
    });

    useEffect(() => {
        setStepVisibility(stepKey, shouldDisplay);
    }, [shouldDisplay]);

    if (loading) {
        return null;
    }

    if (!shouldDisplay) {
        return null;
    }

    const shippingMethodContent = isStepVisited(stepKey) ? (
        <ShippingMethod
            pageIsUpdating={isUpdating}
            onSave={handleDone}
            onSuccess={handleSuccess}
            setPageIsUpdating={setIsUpdating}
        />
    ) : null;

    return (
        <ScrollAnchor ref={shippingMethodRef}>
            <h3 style={{ fontWeight: 600, textTransform: 'uppercase' }}>
                <StepCounter stepKey={stepKey} />
                <FormattedMessage
                    id={'checkoutPage.shippingMethodStep'}
                    defaultMessage={'Shipping Method'}
                />
            </h3>
            {shippingMethodContent}
        </ScrollAnchor>
    );
};

export default ShippingInformationStep;
