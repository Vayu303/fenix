"use client";

import { useState } from "react";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import SocialButtons from "../SocialButtons";

const Footer = () => {
  const [] = useState();

  return (
    <footer className="bg-slate-800 text-slate-200 text-sm mt-0 ">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-2xl font-medium tracking-wide underline">
              Categorie
            </h3>
            <ul className="flex flex-col">
              <Link href="/collection/arredamento">Arredamento</Link>
              <Link href="/collection/collezionismo">Collezionismo</Link>
              <Link href="/collection/mirabilia">Mirabilia</Link>
              <Link href="/collection/abbigliamento">Abbigliamento</Link>
            </ul>
          </FooterList>
          <FooterList>
            <h3 className="text-2xl font-medium tracking-wide underline">
              Assistenza
            </h3>
            <ul className="flex flex-col">
              <Link href="/contatti">Contattaci</Link>
              <Link href="#">Spedizioni</Link>
              <Link href="#">Politiche di reso</Link>
              <Link href="#">FAQs</Link>
            </ul>
          </FooterList>
          <FooterList>
            <h3 className="text-2xl font-medium tracking-wide underline">
              Su di noi
            </h3>
            <Link href="/chi-siamo" className="text-white">Il nostro negozio....</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-2xl font-medium tracking-wide underline">
              Seguici
            </h3>
            <div>
              <SocialButtons children={undefined} />
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
