import React, { Component } from "react";

export default class ServiceTerms extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="standard-modalLabel">
                Terms of Service
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <h6>Last updated December 18, 2020</h6>
              <p>
                Thank you for choosing to be part of our community at Airand
                Technologies ("<b>Company</b>", "<b>we</b>", "<b>us</b>", "{" "}
                <b>our</b> "). We are committed to serving you with the greatest
                deal of excellence and consideration. If you have any questions
                or concerns about these terms and conditions, please contact us
                at chukwuma@airandtech.com.
              </p>
              <br />
              <p>
                When you visit our website{" "}
                <a href="https://www.airand.net">https://www.airand.net</a> (the
                "<b>Website</b>"), use our mobile application, as the case may
                be (the "<b>App</b>") and more generally, use any of our
                services (the "<b>Services</b>", which include the Website and
                App ), we appreciate that you are relying on us to provide you
                with optimum service. In these terms and conditions of service,
                we seek to explain to you in the clearest way possible what
                services we offer, the channels we employ and your expected
                responsibilities. We hope you take some time to read through it
                carefully, as it is important. If there are any terms in this
                notice that you do not agree with, please discontinue use of our
                Services immediately.
              </p>
              <br />
              <p>
                <strong>
                  Please read these terms and conditions carefully as it will
                  help you understand what services we offer and what is
                  expected of you.
                </strong>
              </p>
              <h4>WHAT SERVICE DO WE OFFER?</h4>
              <p>
                We are a technology company that does not directly provide
                delivery, errand nor transportation services. The service of the
                company is to match customers with service providers ("logistics
                patners") best suited to deliver service to them through the use
                of our range of web and mobile applications either downloaded,
                installed and/or accessed via our website. The company is not
                responsible or liable for the acts and/or ommissions of any
                logistics partner or customer and/or any delivery or shipping
                cargo provided to you.{" "}
              </p>
              <h4>WHAT ARE MY RESPONSONBILITIES AS A LOGISTICS PARTNER?</h4>
              <h5>Provision of Service:</h5>
              <p>
                {" "}
                As a logistics partner, you are obligated to follow through with
                the provision of service once you have accepted any
                order("dispatch request") on any of our platforms including our
                mobile app and web applications within the same day the request
                was accepted except for next day deliveries or in rare cases of
                a mutual aggrement for a compromise between customer and
                logistics partner.
              </p>
              <h5>Prohibition of Direct Payments:</h5>
              <p>
                {" "}
                Logistics partners and their respective personnel are prohibited
                from requesting direct payments from customers in cash, bank
                transfer or through any other source or channel asides from out
                platform which includes payment links contained in the emails,
                sms and web URLs sent to the customer(s).
              </p>
              <h5>Demand for Acceptable Payment:</h5>
              <p>
                {" "}
                Logistics partners and their respective personnel are mandated
                to demand only in-platform payments be made by customers before
                completely delivering value to the customer.
              </p>
              <h5>Confirmation of Payment:</h5>
              <p>
                {" "}
                Logistics partners and their respective personnel can confirm
                payments made by customers by checking on their respective apps
                as well as via sms and email alerts from us.
              </p>
              <h4> HOW AND WHEN DO I GET PAID?</h4>
              <p>
                Logistics partners are paid via fund transfers into the bank
                account details provided in the registration form on a weekly
                basis for all transactions executed in the previous week. We
                charge logistics partners a 10% commission on every transaction.
                All pending commissions are deducted before fund transfers are
                done.
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
