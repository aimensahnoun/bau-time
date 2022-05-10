// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

type Data = {
  to: string;
  subject: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, studentNumber, unitName, passport, form , picture, residencePermit } = req.body;

  sgMail.setApiKey(
    process.env.SENDGRID
  );
  const msg = {
    to: "aimensahnoun9@gmail.com", // Change to your recipient
    from: "aimensahnoun@outlook.com", // Change to your verified sender
    subject: "New Assistant Student",
    html: `<p>${name} with student number : ${studentNumber} has joined ${unitName} </p>
          <a href=${passport}>Passport   </a>
          <a href=${picture}>Picture    </a>
          <a href=${residencePermit}>Residence Permit    </a>
          <a href=${form}>Form</a>
  `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
