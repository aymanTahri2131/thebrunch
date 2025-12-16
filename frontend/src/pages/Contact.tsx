import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Instagram,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data).toString(),
      });

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Schiltigheim, Bas-rhin (67)",
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "07 83 45 36 05",
      link: "tel:+33783453605",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@thebrunchtraiteur.fr",
      link: "mailto:contact@thebrunchtraiteur.fr",
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Toujours ouvert",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* HERO */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une question ? Un projet ? Nous sommes à votre écoute.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12">
        <div className="container mx-auto px-4">

          {/* INFOS */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-accent mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.content}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FORM + RIGHT */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* FORM */}
            <Card className="md:col-span-2">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">
                  Envoyez-nous un message
                </h2>

                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Netlify required hidden fields */}
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out if you're human:
                      <input name="bot-field" />
                    </label>
                  </p>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nom complet *
                    </label>
                    <Input
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jean@exemple.fr"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Téléphone
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6">

              {/* WhatsApp */}
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">
                    Contact rapide
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Besoin d'une réponse immédiate ?
                  </p>
                  <Button
                    size="lg"
                    className="w-full bg-[#25D366] text-white"
                    asChild
                  >
                    <a
                      href="https://wa.me/33783453605"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ouvrir WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Instagram */}
              <Card className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white">
                <CardContent className="p-8 text-center">
                  <Instagram className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">
                    Suivez-nous sur Instagram
                  </h3>
                  <Button
                    size="lg"
                    className="bg-white text-black"
                    asChild
                  >
                    <a
                      href="https://www.instagram.com/the_brunch_strasbourg/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir Instagram
                    </a>
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
