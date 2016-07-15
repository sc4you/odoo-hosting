// When choosing an acquirer, display its Pay Now button
var $payment = Clouder.$("#CL_payment>#payment_method");
$payment.on("click", "input[name='acquirer']", function (ev) {
        var payment_id = Clouder.$(ev.currentTarget).val();
        $payment.find("div.oe_sale_acquirer_button[data-id]").hide();
        $payment.find("div.oe_sale_acquirer_button[data-id='"+payment_id+"']").show();
    })
    .find("input[name='acquirer']:checked").click();

// When clicking on payment button: create the tx using json then continue to the acquirer
$payment.on("click", 'button[type="submit"],button[name="submit"]', function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var $form = Clouder.$(ev.currentTarget).parents('form');
    var acquirer_id = Clouder.$(ev.currentTarget).parents('div.oe_sale_acquirer_button').first().data('id');
    if (! acquirer_id) {
        return false;
    }
    $payment.hide();
    Clouder.loading(true, $payment);
    Clouder.$.ajax({
        url: Clouder.pluginPath + 'clouder_form/submit_acquirer',
        data: {
            'clws_id': Clouder.clws_id,
            'acquirer_id': acquirer_id,
            'lang': Clouder.params['lang']
        },
        method:'POST',
        cache: false,
        dataType: 'html',
        success: function(data) {
            Clouder.readresponse(data);
            Clouder.loading(false, $payment);
            $payment.hide();
            $form.submit();
        },
        error: function(h, t, e){
            Clouder.loading(false, $payment);
        }
    });
});
