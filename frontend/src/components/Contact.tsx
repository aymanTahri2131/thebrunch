import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageCircle, Clock, Loader2, Instagram } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
    eventType: "",
    eventDate: "",
    guestCount: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://thebrunchtraiteur-production.up.railway.app/api/communication/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          guestCount: formData.guestCount
        })
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Message envoyé !",
          description: "Nous avons reçu votre message et vous répondrons rapidement.",
        });
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          subject: "",
          eventType: "",
          eventDate: "",
          guestCount: ""
        });
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: MapPin, title: "Adresse", content: "Schiltigheim, Bas-rhin (67)" },
    { icon: Phone, title: "Téléphone", content: "07 83 45 36 05", link: "tel:+33783453605" },
    { icon: Mail, title: "Email", content: "contact@ta-traiteur.fr", link: "mailto:contact@ta-traiteur.fr" },
    { icon: Clock, title: "Horaires", content: "toujours ouvert" },
  ];

  return (
    <section id="contact" className="py-20 bg-accent/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une question ? Un projet ? Nous sommes à votre écoute pour créer
            ensemble votre événement sur mesure.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-accent/20 hover:border-accent/40"
              >
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

        {/* Contact Form & WhatsApp/Instagram */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="md:col-span-2 border-2 border-accent/20 hover:border-accent/40 transition-colors duration-300">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-6 text-foreground">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Fields */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">Nom complet *</label>
                  <Input
                    id="name" name="name" type="text" required
                    value={formData.name} onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="border-accent/20 focus:border-accent"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">Email *</label>
                    <Input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="jean@exemple.fr"
                      className="border-accent/20 focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">Téléphone</label>
                    <Input
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      placeholder="+33 1 23 45 67 89"
                      className="border-accent/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">Sujet</label>
                  <Input
                    id="subject" name="subject" type="text"
                    value={formData.subject} onChange={handleChange}
                    placeholder="Demande de devis, question..."
                    className="border-accent/20 focus:border-accent"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium mb-2 text-foreground">Type d'événement</label>
                    <select
                      id="eventType" name="eventType" value={formData.eventType} onChange={handleChange}
                      className="w-full px-3 py-2 border border-accent/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent bg-background"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="mariage">Mariage</option>
                      <option value="anniversaire">Anniversaire</option>
                      <option value="entreprise">Événement d'entreprise</option>
                      <option value="réveillon">Réveillon</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guestCount" className="block text-sm font-medium mb-2 text-foreground">Nombre d'invités</label>
                    <Input
                      id="guestCount" name="guestCount" type="number"
                      value={formData.guestCount} onChange={handleChange}
                      placeholder="ex: 50"
                      className="border-accent/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium mb-2 text-foreground">Date d'événement souhaitée</label>
                  <Input
                    id="eventDate" name="eventDate" type="date"
                    value={formData.eventDate} onChange={handleChange}
                    className="border-accent/20 focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">Votre message *</label>
                  <Textarea
                    id="message" name="message" required
                    value={formData.message} onChange={handleChange}
                    placeholder="Décrivez votre projet, vos besoins..."
                    rows={6}
                    className="border-accent/20 focus:border-accent"
                  />
                </div>

                <Button
                  type="submit" size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : ('Envoyer le message')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* WhatsApp & Instagram Contact Card */}
          <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors duration-300 h-fit">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Contact Rapide</h3>
              <p className="text-muted-foreground mb-6">
                Besoin d'une réponse immédiate ? Contactez-nous directement sur WhatsApp !
              </p>
              <Button
                size="lg"
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                asChild
              >
                <a
                  href="https://wa.me/33783453605"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Ouvrir WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
          {/* Instagram Card */}
<Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors duration-300 h-[300px] flex items-center justify-center bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white">
  <CardContent className="p-8 text-center flex flex-col items-center justify-center">
    <Instagram className="h-16 w-16 mb-4" />
    <h3 className="text-2xl font-bold mb-3">Suivez-nous sur Instagram</h3>
    <Button
      size="lg"
      className="bg-white text-black hover:bg-gray-100 mt-4"
      asChild
    >
      <a
        href="https://www.instagram.com/the_brunch_strasbourg/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2"
      >
        Voir Instagram
      </a>
    </Button>
  </CardContent>
</Card>

        </div>
      </div>
    </section>
  );
};
