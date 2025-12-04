import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageCircle, Clock, Instagram } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: MapPin, title: "Adresse", content: "Schiltigheim, Bas-rhin (67)" },
    { icon: Phone, title: "Téléphone", content: "07 83 45 36 05", link: "tel:+33783453605" },
    { icon: Mail, title: "Email", content: "thebrunchtraiteur@gmail.com", link: "mailto:thebrunchtraiteur@gmail.com" },
    { icon: Clock, title: "Horaires", content: "toujours ouvert" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Contactez-nous
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une question ? Un projet ? Nous sommes à votre écoute pour créer
            ensemble votre événement sur mesure.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-border/50">
                  <CardContent className="p-6">
                    <Icon className="h-8 w-8 text-accent mx-auto mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="text-muted-foreground hover:text-primary transition-colors">
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

          {/* Contact Form & Right Column */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Form */}
            <Card className="md:col-span-2 border-border/50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">Nom complet *</label>
                    <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Jean Dupont" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">Email *</label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="jean@exemple.fr" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">Téléphone</label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+33 1 23 45 67 89" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">Votre message *</label>
                    <Textarea id="message" name="message" required value={formData.message} onChange={handleChange} placeholder="Décrivez votre projet, vos besoins..." rows={6} />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">Envoyer le message</Button>
                </form>
              </CardContent>
            </Card>

            {/* Right Column: WhatsApp + Instagram */}
            <div className="flex flex-col gap-6">
              {/* WhatsApp Card */}
              <Card className="border-border/50 h-fit">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-foreground">Contact Rapide</h3>
                  <p className="text-muted-foreground mb-6">Besoin d'une réponse immédiate ? Contactez-nous directement sur WhatsApp !</p>
                  <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white" asChild>
                    <a href="https://wa.me/33123456789" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <MessageCircle className="h-5 w-5" /> Ouvrir WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Instagram Card */}
              <Card className="border-border/50 h-[300px] flex items-center justify-center bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white hover:scale-105 transition-transform duration-300">
                <CardContent className="p-8 text-center flex flex-col items-center justify-center">
                  <Instagram className="h-16 w-16 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Suivez-nous sur Instagram</h3>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 mt-4" asChild>
                    <a href="https://www.instagram.com/the_brunch_strasbourg/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
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
