// -*- mode: rjsx; create-lockfiles: nil -*-

/**************************************************************************************************/

import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**************************************************************************************************/

// Stripe Public API Key
export const stripe_public_api_key = "pk_test_51HdczbBKQhCtA3D9aKEImtHELwbA2BGFlSnO4kfki1mjjs8xf0ZuptlEMy5WUn6S6YX2MUb1rUDm2pArLiV4qH9Y00b2ZFJAWk";

// reCaptcha Site Key
export const recaptcha_site_key = '6LeTlt0ZAAAAAEH8r-8lYhgdzfoKMxkWVA8BMklX';

// export const backend_url = "https:portal-demo-backend.fabrice-salvaire.fr";
// export const backend_url = "http://localtest.me:8000";
export const backend_url = "http://127.0.0.1:8000";

/**************************************************************************************************/

// https://www.impots.gouv.fr/portail/particulier/questions/jai-fait-des-dons-une-association-que-puis-je-deduire
const reduced_rate_individual = 66;
const reduced_rate_organisation = 60;

function compute_reduced_amount(amount, reduced_rate) {
    let p = 1 - reduced_rate / 100;
    return Math.trunc((amount * p)*100)/100;   // .toPrecision(2) -> scientific notation ???
}

export function reduced_rate_for_donator(donator_type) {
    return donator_type === "individual" ? reduced_rate_individual : reduced_rate_organisation;
}

export function reduced_amount_for_donator(amount, donator_type) {
    return compute_reduced_amount(amount, reduced_rate_for_donator(donator_type));
}

/**************************************************************************************************/

//  Stripe Fee Computation

// P = N + 0.25 + N*f
//   = N*(1+f) + 0.25

// N = (P - 0.25) / (1 + f)

// 10*(1+1.4/100) + 0.25 = + 0.39
// 100                   = + 1.65
// 500                   = + 7.25

const stripe_fee_percent = 1.4 / 100; // %
const stripe_fee_base = 0.25; // €

export function get_amount_for_stripe(amount) {
    return amount * (1 + stripe_fee_percent) + stripe_fee_base;
}

export function get_net_stripe_amount(amount) {
    return (amount - stripe_fee_base) / (1 + stripe_fee_percent);
}

export function amount_to_str(amount) {
    if (!Number.isNaN(amount))
        return amount.toLocaleString(
            'fr-FR',
            {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }
        );
    else
        return "…";
}

/**************************************************************************************************/

export const organisation_name = "Organisation";

export const messages = {
    accessibility_checkbox_title: "Activer le mode d'accessibilité avancé du formulaire",

    title1: `1. Je veux donner à ${organisation_name}`,
    donation_occurence_fieldset_legend: "Choississez entre un don unique ou mensuel",
    once: "UNE FOIS",
    monthly: "TOUS LES MOIS",
    amount_fieldset_legend: "Choississez un montant prédéfini",
    input_amount_label: "Montant libre",
    input_amount_helper_text: "Ou saisissez un montant libre, e.g. 123 ou 123,45 en Euro",
    invalid_amount: "montant invalide",

    title2: "2. Je complète mes informations",
    title2_tip: "Ces informations ne sont requises que pour des raisons pratiques et légales afin de pouvoir vous délivrer un reçu fiscal.",
    // Sachez également que vous pouvez vérifier si votre don a bien été effectué dans la page « Liste des dons ».
    // Bien évidemment, vos nom et prénom y sont anonymisés.
    i_represent: "Je représente",
    an_individual: "Un particulier",
    an_organisation: "Une structure",
    organisation_tip: "Entreprise, association, collectivité...",
    email: "Courriel",
    // Pseudonyme
    i_would_like_to_receive_a_tax_receipt: "Je souhaite recevoir un reçu fiscal",
    // Je veux que mon don reste anonyme
    name: "Nom",
    forname: "Prénom",
    organisation_name: "Raison sociale",
    address: "Adresse",
    complement: "Complément",
    zip_code: "Code postal",
    city: "Ville",
    country: "Pays",
    // En France, grâce à la déduction d’impôts de 66 %, votre don de 50 € vous coûtera 17 €.

    // Si vous souhaitez devenir mécène de ${organisation_name} et apparaître sur cette page, contactez-nous.

    title3: "3. J’accède au paiement",
    payment_method_fieldset_legend: "Choississez un moyen de paiement",
    card: "Carte Bancaire",
    // Paypal
    bank_transfer: "Virement",
    check: "Chèque",

    defiscalisation_text: ({donator_type, amount}) => {
        console.log("defiscalisation_text", donator_type, amount);
        let rate = reduced_rate_for_donator(donator_type);
        let _amount = Number.parseFloat(amount);   // Fixme: use xis_amount_valid ???
        if (!Number.isNaN(_amount)) {
            let reduced_amount = compute_reduced_amount(_amount, rate);
            let amount_str = amount_to_str(_amount);
            let reduced_amount_str = amount_to_str(reduced_amount);
            return (
                <p>
                    En France, grâce à la déduction d’impôts de {rate} %,
                    votre don de <strong>{amount_str}</strong> vous coûtera <strong>{reduced_amount_str}</strong>.
                </p>
            );
        } else
            return (<p></p>);
    },

    submit_title: (amount) => <span>Je donne {amount_to_str(amount)} maintenant</span>,

    // Les reçus fiscaux (en France uniquement) sont envoyés par courriel en mars/avril 2021 (avant la déclaration d’impôt) pour les dons versés en 2020
    // Les rapports d’activité et financier de l’association peuvent être consultés depuis notre page de présentation de l’association
    // Si vous avez d’autres questions, les réponses se trouvent peut-être là…
};

/**************************************************************************************************/

export const default_amounts = [30, 50, 75, 100];

export const payment_methods = [
    { id: "card", title: messages.card, icon: <FontAwesomeIcon icon="credit-card" /> },
    { id: "bank_transfer", title: messages.bank_transfer, icon: <FontAwesomeIcon icon="building" /> }, /* <AccountBalanceIcon/> */
    { id: "check", title: messages.check, icon:  <FontAwesomeIcon icon="money-check" /> },
];
