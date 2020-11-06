<template>
  <div id="soutenir">
    <div class="row">
      <div class="col-lg-5 mt-5">
        <h2 v-html="$t('home.soutenir.title')"></h2>
        <p
          class="lead"
          v-html="$t('meta.lead')"
        ></p>
        <svg-icon
          name="r-heart"
          size="5x"
          variant="fc-g5 d-block text-center my-5"
        />
        <p v-html="$t('home.soutenir.text')"></p>
        <ul class="list-unstyled text-secondary px-4 py-2">
          <li class="mb-2">
            <svg-icon name="check-circle" />
            <a
              class="fc-g7 hover:fc-g8"
              :href="`${$t('link.soutenir')}/#actions`"
              @click.prevent.stop="goTo('Actions')"
              v-html="$t('home.soutenir.why')"
            ></a>
          </li>
          <li class="mb-2">
            <svg-icon name="check-circle" />
            <a
              class="fc-g7 hover:fc-g8"
              :href="`${$t('link.soutenir')}/#lastyear`"
              @click.prevent.stop="goTo('Lastyear')"
              v-html="$t('home.soutenir.numbers')"
            ></a>
          </li>
          <li class="mb-2">
            <svg-icon name="check-circle" />
            <a
              class="fc-g7 hover:fc-g8"
              :href="`${$t('link.soutenir')}/#questions`"
              v-html="$t('questions.title')"
            ></a>
          </li>
        </ul>
      </div>

      <div :class="`col-lg-7 ${form.monthly ? 'monthly' : 'onetime' }`">
        <div class="ombre px-4 pt-3">
          <b-form
            id="form_don"
            @submit="payRedirection"
          >
            <!-- Step 1 #howMuch ---------------------------------------------->
            <div id="howmuch">
              <h3 v-html="$t('form.step1.title')"></h3>
              <b-radio-group
                v-model="form.monthly"
                buttons
                button-variant=" text-uppercase fc-g7 text-decoration-none"
                size="lg"
                @change="form.don = form.monthly ? 50 : 10; form.other1 = form.otherM = ''"
              >
                <b-radio :value="false">
                  <svg-icon
                    name="hand-holding-heart"
                    :label="$t('form.step1.oneshot')"
                  />
                </b-radio>
                <b-radio :value="true">
                  <svg-icon
                    name="hand-holding-medical"
                    :label="$t('form.step1.monthly')"
                  />
                </b-radio>
              </b-radio-group>

              <!-- Monthly -->
              <div class="row mx-0 amount amountM">
                <div
                  v-for="money in btnM"
                  :key="money"
                  class="col-sm-4 col-6"
                >
                  <button
                    type="button"
                    :class="`btn${(form.don === money ? ' selected' : '')}`"
                    :value="money"
                    @click="form.don = money; form.otherM = form.other1 = ''"
                    v-text="$n(money, 'eur')"
                  ></button>
                </div>
                <div class="col-sm-8 col-12">
                  <label
                    for="otherM"
                    class="sr-only"
                    v-html="$t('form.step1.other', { n: 42 })"
                  ></label>
                  <b-input-group
                    :class="`${(btnM.indexOf(form.don) < 0 ? ' selected' : '')}`"
                    prepend="€"
                  >
                    <b-form-input
                      id="otherM"
                      v-model.number="form.otherM"
                      min="1"
                      max="100000"
                      step="any"
                      pattern="/^\d+([\.\,]\d{1,2})?$/"
                      :placeholder="$t('form.step1.other', { n: 42 })"
                      type="number"
                      @change="check('otherM')"
                    />
                  </b-input-group>
                </div>
              </div>

              <!-- One time -->
              <div class="row mx-0 amount amount1">
                <div
                  v-for="money in btn1"
                  :key="money"
                  class="col-sm-4 col-6"
                >
                  <button
                    type="button"
                    :class="`btn${(form.don === money ? ' selected' : '')}`"
                    :value="money"
                    @click="form.don = money; form.otherM = form.other1 = '';"
                    v-text="$n(money, 'eur')"
                  ></button>
                </div>
                <div class="col-sm-8 col-12">
                  <label
                    for="other1"
                    class="sr-only"
                    v-html="$t('form.step1.other', { n: 133.70 })"
                  ></label>
                  <b-input-group
                    :class="`${(btn1.indexOf(form.don) < 0 ? ' selected' : '')}`"
                    prepend="€"
                  >
                    <b-form-input
                      id="other1"
                      v-model.number="form.other1"
                      min="1"
                      max="100000"
                      step="any"
                      pattern="/^\d+([\.\,]\d{1,2})?$/"
                      :placeholder="$t('form.step1.other', { n: 133.70 })"
                      type="number"
                      @change="check('other1')"
                    />
                  </b-input-group>
                </div>
              </div>
            </div>

            <!-- Step 2 #whoAreYou -------------------------------------------->
            <div id="whoAreYou">
              <h3>
                <span v-html="$t('form.step2.title')"></span>
                <button
                  id="privacy"
                  class="btn p-0 btn-lg"
                  type="button"
                >
                  <svg-icon
                    name="question-circle"
                    variant=" fc-g7"
                    :label="$t('form.step2.private')"
                    sr-only
                  />
                </button>
                <b-popover
                  target="privacy"
                  placement="leftbottom"
                  :triggers="['click', 'hover']"
                >
                  <div v-html="$t('form.step2.private_tip')"></div>
                </b-popover>
              </h3>

              <b-card
                class="mb-4 pt-2 pb-4 px-3 mx-3"
                no-body
              >
                <!-- Individual / Society -->

                <fieldset class="form-group">
                  <legend
                    class="sr-only"
                    v-html="$t('form.step2.type')"
                  ></legend>
                  <b-row>
                    <b-col
                      sm="4"
                      lg="3"
                      aria-hidden="true"
                      class="col-form-label"
                      v-html="$t('form.step2.type')"
                    />

                    <b-col>
                      <b-radio-group
                        v-model="form.society"
                        buttons
                        button-variant=" text-uppercase fc-g7 py-2"
                        size="sm"
                        @change="form.firstname = !form.society ? ' ' : ''"
                      >
                        <b-radio
                          :value="false"
                          class="text-decoration-none"
                        >
                          <svg-icon
                            name="r-address-card"
                            :label="$t('form.step2.part')"
                          />
                        </b-radio>
                        <b-radio
                          :value="true"
                          class="text-decoration-none"
                        >
                          <span
                            style="cursor: help"
                            :title="$t('form.step2.corp_tip')"
                          >
                            <svg-icon
                              name="university"
                              :label="$t('form.step2.corp')"
                            />
                          </span>
                        </b-radio>
                      </b-radio-group>
                    </b-col>
                  </b-row>

                  <p
                    v-show="form.society"
                    id="partenariat"
                    class="fc-g7 ml-2 mb-0"
                    v-html="$t('form.step2.mecenat')"
                  ></p>
                </fieldset>

                <!-- Email -->
                <b-col>
                  <b-input-group class="mb-2">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <svg-icon
                          name="r-envelope"
                          size="fw"
                        />
                        <label
                          for="email"
                          class="sr-only"
                          v-html="$t('form.step2.email')"
                        ></label>
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      id="email"
                      v-model="form.email"
                      :placeholder="$t('form.step2.email')"
                      required
                      :title="form.society
                        ? $t('form.step2.society_email_ex', '-t')
                        : $t('form.step2.email_ex', '-t')"
                      type="email"
                      :state="form.ok.email"
                      @focusout="check('email')"
                    />
                  </b-input-group>
                </b-col>

                <!-- Nickname -->
                <b-col>
                  <b-input-group class="mb-2">
                    <template v-slot:prepend>
                      <b-input-group-text>
                        <svg-icon
                          v-show="form.state.anonymous"
                          name="user-secret"
                          size="fw"
                        />
                        <svg-icon
                          v-show="!form.state.anonymous"
                          name="r-user"
                          size="fw"
                        />
                        <label
                          for="nickname"
                          class="sr-only"
                          v-html="$t('form.step2.nickname')"
                        ></label>
                      </b-input-group-text>
                    </template>
                    <b-form-input
                      id="nickname"
                      v-model="form.nickname"
                      :placeholder="$t('form.step2.nickname')"
                      :title="$t('form.step2.nickname_ex', '-t')"
                      :readonly="form.state.anonymous"
                      required
                      :state="form.ok.nickname"
                      @focusout="check('nickname')"
                    />
                  </b-input-group>
                </b-col>
                <b-col>
                  <!-- Anonymous ? -->
                  <b-form-checkbox
                    v-model="form.state.anonymous"
                    name="anonymous"
                    switch
                    class="fc-g7"
                    @change="anonymize()"
                  >
                    <span v-html="$t('form.step1.anonymous')"></span>
                  </b-form-checkbox>
                </b-col>
                <b-col>
                  <!-- Receipt ? -->
                  <b-form-checkbox
                    v-model="form.state.receipt"
                    name="receipt"
                    switch
                    class="fc-g7"
                    @change="fillReceiptFields()"
                  >
                    <span v-html="$t('form.step1.receipt')"></span>
                  </b-form-checkbox>
                </b-col>

                <div
                  v-show="form.state.receipt"
                  class="mt-2"
                >
                  <!-- Lastname / Firstname -->
                  <b-col v-if="!form.society">
                    <b-input-group>
                      <template v-slot:prepend>
                        <b-input-group-text>
                          <svg-icon
                            name="address-card"
                            size="fw"
                          />
                          <label
                            for="lastname"
                            class="sr-only"
                            v-html="$t('form.step2.lastname')"
                          ></label>
                          <label
                            for="firstname"
                            class="sr-only"
                            v-html="$t('form.step2.firstname')"
                          ></label>
                        </b-input-group-text>
                      </template>
                      <b-form-input
                        id="lastname"
                        v-model="form.lastname"
                        :placeholder="$t('form.step2.lastname')"
                        :title="$t('form.step2.lastname_ex', '-t')"
                        required
                        :state="form.ok.lastname"
                        @focusout="check('lastname')"
                      />
                      <b-form-input
                        id="firstname"
                        v-model="form.firstname"
                        :placeholder="$t('form.step2.firstname')"
                        :title="$t('form.step2.firstname_ex', '-t')"
                        required
                        :state="form.ok.firstname"
                        @focusout="check('firstname')"
                      />
                    </b-input-group>
                  </b-col>
                  <!-- Society -->
                  <b-col v-else>
                    <b-input-group>
                      <template v-slot:prepend>
                        <b-input-group-text>
                          <svg-icon
                            name="university"
                            size="fw"
                          />
                          <label
                            for="lastname"
                            class="sr-only"
                            v-html="$t('form.step2.lastname')"
                          ></label>
                        </b-input-group-text>
                      </template>
                      <b-form-input
                        id="lastname"
                        v-model="form.lastname"
                        :placeholder="$t('form.step2.society')"
                        :title="$t('form.step2.society_ex', '-t')"
                        required
                        :state="form.ok.lastname"
                        @focusout="check('lastname')"
                      />
                    </b-input-group>
                  </b-col>

                  <!-- Address -->
                  <b-col>
                    <b-input-group>
                      <template v-slot:prepend>
                        <b-input-group-text>
                          <svg-icon
                            name="map-marker"
                            size="fw"
                          />
                          <label
                            for="address1"
                            class="sr-only"
                            v-html="$t('form.step2.address1')"
                          ></label>
                        </b-input-group-text>
                      </template>
                      <b-form-input
                        id="address1"
                        v-model="form.address1"
                        :placeholder="$t('form.step2.address1')"
                        :title="$t('form.step2.address1_ex', '-t')"
                        required
                        :state="form.ok.address1"
                        @focusout="check('address1')"
                      />
                    </b-input-group>
                  </b-col>
                  <b-col>
                    <b-input-group>
                      <template v-slot:prepend>
                        <b-input-group-text>
                          <label
                            for="address2"
                            class="sr-only"
                            v-html="$t('form.step2.address2')"
                          ></label>
                        </b-input-group-text>
                      </template>
                      <b-form-input
                        id="address2"
                        v-model="form.address2"
                        :placeholder="$t('form.step2.address2')"
                        :title="$t('form.step2.address2_ex', '-t')"
                      />
                    </b-input-group>
                  </b-col>

                  <!-- Zip / City -->
                  <b-col>
                    <b-input-group>
                      <template v-slot:prepend>
                        <b-input-group-text>
                          <label
                            for="zip"
                            class="sr-only"
                            v-html="$t('form.step2.zip')"
                          ></label>
                          <label
                            for="city"
                            class="sr-only"
                            v-html="$t('form.step2.city')"
                          ></label>
                        </b-input-group-text>
                      </template>
                      <b-form-input
                        id="zip"
                        v-model="form.zip"
                        :placeholder="$t('form.step2.zip')"
                        :title="$t('form.step2.zip_ex', '-t')"
                        required
                        :state="form.ok.zip"
                        @focusout="check('zip')"
                      />
                      <b-form-input
                        id="city"
                        v-model="form.city"
                        :placeholder="$t('form.step2.city')"
                        :title="$t('form.step2.city_ex', '-t')"
                        required
                        :state="form.ok.city"
                        @focusout="check('city')"
                      />
                    </b-input-group>
                  </b-col>

                  <!-- Country -->
                  <b-col>
                    <b-input-group>
                      <template v-slot:prepend>
                        <b-input-group-text>
                          <label
                            for="country"
                            class="sr-only"
                            v-html="$t('form.step2.country')"
                          ></label>
                        </b-input-group-text>
                      </template>
                      <b-form-select
                        id="country"
                        v-model="form.country"
                        required
                        class="custom-select"
                      >
                        <option
                          v-for="(country, key) in $t('country')"
                          :key="key"
                          :value="key"
                          v-html="`${$t(`flag.${key}`)} ${country}`"
                        ></option>
                      </b-form-select>
                    </b-input-group>
                  </b-col>

                  <!-- French defisc -->
                  <p
                    v-show="/(FR|GP|GF|RE|MQ|YT|NC|PF|PM|WF)/.test(form.country)"
                    class="mt-4 mb-0 fc-g7"
                    v-html="$t('form.step3.defisc_text', calcDefisc())"
                  ></p>
                </div>
              </b-card>
            </div>

            <!-- Step 3 ------------------------------------------------------->
            <div id="payment">
              <h3 v-html="$t('form.step3.title')"></h3>
              <!-- Payment mode -->

              <b-radio-group
                v-model="form.pay_mode"
                buttons
                button-variant="light text-uppercase col-12 col-md-2 col-lg-5 mx-2"
                class="row justify-content-center d-flex"
              >
                <b-radio value="cb">
                  <svg-icon
                    name="credit-card"
                    variant="d-block mb-2"
                    :label="$t('form.step3.cb')"
                  />
                </b-radio>
                <b-radio value="pp">
                  <svg-icon
                    name="b-paypal"
                    variant="d-block mb-2"
                    :label="$t('form.step3.pp')"
                  />
                </b-radio>
                <b-radio value="vir">
                  <svg-icon
                    name="r-building"
                    variant="d-block mb-2"
                    :label="$t('form.step3.vir')"
                  />
                </b-radio>
                <b-radio value="chq">
                  <svg-icon
                    name="money-check"
                    variant="d-block mb-2"
                    :label="$t('form.step3.chq')"
                  />
                </b-radio>
              </b-radio-group>

              <!-- Donate -->
              <p class="text-center">
                <b-button
                  id="btnVerif"
                  type="submit"
                >
                  <span
                    style="font-size: 24px;"
                    v-html="$t('form.step3.i_give')"
                  ></span>
                  <br />
                  <span v-text="$n(form.don, 'eur')"></span>
                  <span
                    v-html="form.monthly
                      ? $t('form.step3.monthly')
                      : $t('form.step3.now')"
                  ></span>
                </b-button>
              </p>
            </div>
          </b-form>

          <div class="fb-g2 fc-g7 mx-n4 px-4 py-3">
            <svg-icon
              name="r-question-circle"
              size="4x"
              variant="float-left fc-g6 mr-2"
            />
            <h4
              class="sr-only"
              v-html="$t('form.ask.title')"
            ></h4>
            <ul class="small list-unstyled">
              <li
                v-show="form.monthly"
                v-html="$t('form.ask.stop')"
              ></li>
              <li
                v-show="form.monthly"
                v-html="$t('form.ask.edit')"
              ></li>
              <li
                v-show="/(FR|GP|GF|RE|MQ|YT|NC|PF|PM|WF)/.test(form.country)"
                v-html="$t('form.ask.send')"
              ></li>
              <li v-html="$t('form.ask.moral')"></li>
              <li v-html="$t('form.ask.other')"></li>
            </ul>
          </div>
        </div>

        <ModalVir
          :open="modal.openVir"
          :form="form"
        />

        <ModalChq
          :open="modal.openChq"
          :form="form"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ModalVir from './ModalVir.vue';
import ModalChq from './ModalChq.vue';

export default {
  components: {
    ModalVir,
    ModalChq,
  },

  data() {
    return {
      hash: window.location.hash,
      btnM: [5, 10, 25, 50],
      btn1: [30, 50, 75, 100],
      form: {
        don: 10,
        monthly: true,
        otherM: '',
        other1: '',
        society: false,
        nickname: '',
        lastname: '',
        firstname: '',
        email: '',
        address1: '',
        address2: '',
        zip: '',
        city: '',
        country: 'FR',
        pay_mode: 'cb',
        pay_ref: this.randomRef(),
        pay_send: '',
        ok: {
          nickname: null,
          lastname: null,
          firstname: null,
          email: null,
          address1: null,
          zip: null,
          city: null,
        },
        state: {
          anonymous: false,
          receipt: true,
        },
      },
      modal: {
        openVir: false,
        openChq: false,
      },
    };
  },

  methods: {
    setHash(hash) {
      if (window.history.pushState) {
        window.history.pushState(null, null, hash);
      } else {
        window.location.hash = hash;
      }
      this.hash = hash;
    },

    randomRef() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let randomstring = '';
      for (let i = 0; i < 2; i += 1) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
      }
      return randomstring + Math.trunc(new Date().getTime() / 1000);
    },

    check(input) {
      const el = document.getElementById(input);
      switch (input) {
        case 'otherM':
          if (!Number.isNaN(this.form.otherM)) {
            this.form.otherM = Number.parseFloat(this.form.otherM).toFixed(2);
            this.form.don = this.form.otherM;
          } else {
            this.form.don = 10;
          }
          this.form.other1 = '';
          break;
        case 'other1':
          if (!Number.isNaN(this.form.other1)) {
            this.form.other1 = Number.parseFloat(this.form.other1).toFixed(2);
            this.form.don = this.form.other1;
          } else {
            this.form.don = 50;
          }
          this.form.otherM = '';
          break;
        case 'email':
          if (el.validity.valueMissing) {
            this.form.ok.email = false;
            el.setCustomValidity(this.$t('form.step2.error_empty'));
          } else if (el.validity.typeMismatch) {
            this.form.ok.email = false;
            el.setCustomValidity(this.$t('form.step2.error_email'));
          } else {
            this.form.ok.email = true;
            el.setCustomValidity('');
          }
          break;
        default:
          if (el.validity.valueMissing) {
            this.form.ok[input] = false;
            el.setCustomValidity(this.$t('form.step2.error_empty'));
          } else {
            this.form.ok[input] = true;
            el.setCustomValidity('');
          }
          break;
      }
    },

    addFormField(form, key, value) {
      const hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', value);

      form.appendChild(hiddenField);
    },

    payRedirection(e) {
      const form = document.createElement('form');
      const url = [
        'https://www.paypal.com/cgi-bin/webscr?',
      ];
      const offPayUrl = [
        'https://soutenir.framasoft.org/offline_paiement.php?payment=',
      ];

      let lg = this.$route.meta.lang.toUpperCase();
      // Choose in available Monetico languages (fallback EN)
      lg = ['DE', 'EN', 'ES', 'FR', 'IT', 'JA', 'NL', 'PT', 'SV'].includes(lg)
        ? lg
        : 'EN';

      const custom = [
        `campaign=${encodeURIComponent(this.$t('host'))}`,
        `nickname=${encodeURIComponent(this.form.nickname)}`,
        `anonymous=${+this.form.state.anonymous}`,
        `receipt=${+this.form.state.receipt}`,
        `lg=${lg}`,
      ];

      switch (this.form.pay_mode) {
        // TPE Monetico / CM-CIC
        case 'cb':
          form.setAttribute('method', 'POST');
          form.setAttribute('action', `https://soutenir.framasoft.org/monetico/before_paiement_${(this.form.monthly ? '2828134' : '2828136')}.php`);

          this.addFormField(form, 'nom', this.form.lastname);
          this.addFormField(form, 'prenom', this.form.firstname);
          this.addFormField(form, 'mail', this.form.email);
          this.addFormField(form, 'adresse1', this.form.address1);
          this.addFormField(form, 'adresse2', this.form.address2);
          this.addFormField(form, 'ville', this.form.city);
          this.addFormField(form, 'cp', this.form.zip);
          this.addFormField(form, 'pays', this.$t(`country.${this.form.country}`));
          this.addFormField(form, 'montant', this.form.don);
          this.addFormField(form, 'texte_libre', encodeURIComponent(custom.join('&')));
          this.addFormField(form, 'lgue', lg);

          document.body.appendChild(form);
          form.submit();
          break;
        // Paypal
        case 'pp':
          if (this.form.monthly) {
            url.push(
              'cmd=_xclick-subscriptions',
              `&item_name=${encodeURIComponent('Framasoft (don récurrent mensuel)')}`,
              `&a3=${this.form.don}`,
              '&p3=1',
              '&t3=M',
              '&src=1',
              '&no_note=1',
              '&no_shipping=1',
            );
          } else {
            url.push(
              'cmd=_donations',
              `&amount=${this.form.don}`,
              `&item_name=${encodeURIComponent('Framasoft (don ponctuel)')}`,
            );
          }
          url.push(
            '&business=6HSVUPKRDAGC2', // Framasoft Paypal ID
            `&return=${encodeURIComponent(`https://soutenir.framasoft.org/${this.$t('lang')}/merci`)}`,
            '&currency_code=EUR',
            '&address_override=1', // Prefill Paypal’s form
            '&charset=utf-8',
            `&last_name=${encodeURIComponent(this.form.lastname)}`,
            `&first_name=${encodeURIComponent(this.form.firstname)}`,
            `&email=${encodeURIComponent(this.form.email)}`,
            `&address1=${encodeURIComponent(this.form.address1)}`,
            `&address2=${encodeURIComponent(this.form.address2)}`,
            `&zip=${encodeURIComponent(this.form.zip)}`,
            `&city=${encodeURIComponent(this.form.city)}`,
            `&country=${this.form.country}`,
            `&custom=${encodeURIComponent(custom.join('&'))}`,
          );
          this.form.pay_send = url.join('');
          window.location.href = this.form.pay_send;
          break;
        // Vir + Chq
        default:
          this.form.pay_ref = this.randomRef(); // Donator must copy the ref
          if (this.form.pay_mode === 'vir') {
            this.modal.openVir = true;
            offPayUrl.push(encodeURIComponent(`Virement${this.form.monthly ? ' mensuel' : ''}`));
          } else {
            this.modal.openChq = true;
            offPayUrl.push(encodeURIComponent('Chèque'));
          }
          offPayUrl.push(
            `&lg=${this.$t('lang')}`,
            `&ref=${this.form.pay_ref}`,
            `&lastname=${encodeURIComponent(this.form.lastname)}`,
            `&firstname=${encodeURIComponent(this.form.firstname)}`,
            `&email=${encodeURIComponent(this.form.email)}`,
            `&address1=${encodeURIComponent(this.form.address1)}`,
            `&address2=${encodeURIComponent(this.form.address2)}`,
            `&zip=${encodeURIComponent(this.form.zip)}`,
            `&city=${encodeURIComponent(this.form.city)}`,
            `&country=${this.$t(`country.${this.form.country}`)}`,
            `&amount=${this.form.don}`,
            `&custom=${encodeURIComponent(custom.join('&'))}`,
          );
          this.form.pay_send = offPayUrl.join('');
          fetch(this.form.pay_send)
            .catch(err => console.error(err)); // eslint-disable-line
          break;
      }
      e.preventDefault();
    },

    anonymize() {
      if (this.form.state.anonymous) {
        this.form.nickname = '';
        this.form.ok.nickname = false;
      } else {
        this.form.nickname = 'Anonymous';
        this.form.ok.nickname = true;
      }
    },

    fillReceiptFields() {
      const fields = ['lastname', 'firstname', 'address1', 'zip', 'city'];
      if (!this.form.state.receipt) {
        // Reinit fields
        fields.forEach((field) => {
          this.form[field] = this.form[field].replace(/^ $/, '');
          this.form.ok[field] = null;
        });
        if (this.form.society) this.form.firstname = ' ';
      } else {
        // Fill void fields with space
        fields.forEach((field) => {
          this.form[field] = this.form[field].replace(/^$/, ' ');
        });
      }
    },

    calcDefisc() {
      const defisc = this.form.society ? 0.60 : 0.66;
      return {
        percent: this.$n(defisc, { style: 'percent' }),
        amount: `<b>${this.$n(this.form.don, 'eur')}</b>`,
        defisc: `<b>${this.$n(this.form.don - this.form.don * defisc, 'eur')}</b>`,
      };
    },

    goTo(target) {
      this.$emit(`goTo${target}`);
    },
  },
};
</script>
