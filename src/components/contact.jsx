import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => (
  <div className="flex items-center justify-center bg-background px-6 py-12">
    <div className="text-center max-w-6xl mx-auto py-15">
      <b className="text-muted-foreground uppercase font-semibold text-sm tracking-wider">
        Contact Us
      </b>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        Get In Touch
      </h2>
      <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
        Our friendly team is always here to chat. Reach out via email, phone, or visit our office.
      </p>

      <div className="max-w-(--breakpoint-xl) mx-auto py-24 grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10 px-6 md:px-0">
        {/* Email */}
        <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
          <div className="h-14 w-14 flex items-center justify-center bg-primary/10 border border-border rounded-full shadow-md text-primary group-hover:bg-primary/20 transition-colors duration-300">
            <MailIcon size={24} />
          </div>
          <h3 className="mt-6 font-semibold text-xl text-foreground">Email</h3>
          <p className="mt-2 text-muted-foreground">Our friendly team is here to help.</p>
          <Link
            className="mt-4 font-medium text-primary hover:underline"
            to="mailto:info@malawipassport.gov.mw"
          >
            info@malawipassport.gov.mw
          </Link>
        </div>

        {/* Office */}
        <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
          <div className="h-14 w-14 flex items-center justify-center bg-primary/10 border border-border rounded-full shadow-md text-primary group-hover:bg-primary/20 transition-colors duration-300">
            <MapPinIcon size={24} />
          </div>
          <h3 className="mt-6 font-semibold text-xl text-foreground">Office</h3>
          <p className="mt-2 text-muted-foreground">Come say hello at our office HQ.</p>
          <Link
            className="mt-4 font-medium text-primary hover:underline"
            to="https://goo.gl/maps/abc123"
            target="_blank"
          >
            Passport HQ, City Centre <br /> Lilongwe, Malawi
          </Link>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300">
          <div className="h-14 w-14 flex items-center justify-center bg-primary/10 border border-border rounded-full shadow-md text-primary group-hover:bg-primary/20 transition-colors duration-300">
            <PhoneIcon size={24} />
          </div>
          <h3 className="mt-6 font-semibold text-xl text-foreground">Phone</h3>
          <p className="mt-2 text-muted-foreground">Mon-Fri from 8am to 5pm.</p>
          <Link
            className="mt-4 font-medium text-primary hover:underline"
            to="tel:+26511234567"
          >
            +265 1 123 4567
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
