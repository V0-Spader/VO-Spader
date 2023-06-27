describe('payments test (with setup and tear-down)', () => {
    beforeEach(function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
    });

    it('should add a new payment to allpayments on submitPaymentInfo()', () => {
        submitPaymentInfo();
    
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('20');
        expect(allPayments['payment1'].tipPercent).toEqual(20);
    });
    
    it('should not add a new payment on submitpaymentInfo() with empty input', () => {
        billAmtInput.value = '';
        submitPaymentInfo();
    
        expect(Object.keys(allPayments).length).toEqual(0);
    });
    
    it('should payment update #paymentTable on appendPayment()', () => {
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;
    
        appendPaymentTable(curPayment);
    
        let currentTdList = document.querySelectorAll('#paymentTable tbody tr td');
    
        expect(currentTdList.length).toEqual(4);
        expect(currentTdList[0].innerText).toEqual('$100');
        expect(currentTdList[1].innerText).toEqual('$20');
        expect(currentTdList[2].innerText).toEqual('%20');
        expect(currentTdList[3].innerText).toEqual('X');
    });
    
    it('should create a new payment on createCurPayment()', () => {
        let expectedPayment = {
            billAmt: '100',
            tipAmt: '20',
            tipPercent: 20,
        }
    
        expect(createCurPayment()).toEqual(expectedPayment);
    });
    
    it('should not create payments with empty input on createCurPayment()', () => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let curPayment = createCurPayment();
    
        expect(curPayment).toEqual(undefined);
    });
    
    afterEach(function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
        
    });

});