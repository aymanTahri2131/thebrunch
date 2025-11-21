import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, MessageCircle, Clock, Loader2 } from "lucide-react";
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
        headers: {
          'Content-Type': 'application/json',
        },
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
    { icon: Clock, title: "Horaires", content: "Toujours ouvert" },
  ];

  return (
    <section id="contact" className="py-20 bg-accent/10">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Contactez-nous
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une question ? Un projet ? Nous sommes à votre écoute.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <Card key={i} className="text-center hover:shadow-xl transition border-2 border-accent/20 hover:border-accent/40">
                <CardContent className="p-6">
                  <Icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a href={info.link} className="text-muted-foreground hover:text-primary">
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

        {/* Form + WhatsApp */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {/* Form */}
          <Card className="md:col-span-2 border-2 border-accent/20 hover:border-accent/40">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-6 text-foreground">Envoyez-nous un message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Nom complet *</label>
                  <Input name="name" required value={formData.name} onChange={handleChange} placeholder="Jean Dupont" />
                </div>

                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Email *</label>
                    <Input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="jean@exemple.fr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Téléphone</label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+33 6..." />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Sujet</label>
                  <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="Demande de devis..." />
                </div>

                {/* Event Type + Guests */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Type d'événement</label>
                    <select name="eventType" value={formData.eventType} onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-background border-accent/20">
                      <option value="">Sélectionner...</option>
                      <option value="mariage">Mariage</option>
                      <option value="anniversaire">Anniversaire</option>
                      <option value="entreprise">Entreprise</option>
                      <option value="réveillon">Réveillon</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Nombre d'invités</label>
                    <Input name="guestCount" type="number" value={formData.guestCount} onChange={handleChange} placeholder="ex: 50" />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Date souhaitée</label>
                  <Input name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Votre message *</label>
                  <Textarea name="message" rows={6} required value={formData.message} onChange={handleChange} placeholder="Décrivez votre projet..." />
                </div>

                {/* Button */}
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-accent text-white">
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Envoi...</> : "Envoyer le message"}
                </Button>

              </form>
            </CardContent>
          </Card>

          {/* WhatsApp */}
          <Card className="border-2 border-accent/20 hover:border-accent/40 h-fit">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">Contact Rapide</h3>
              <p className="text-muted-foreground mb-6">Contactez-nous sur WhatsApp</p>

              <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white" asChild>
                <a href="https://wa.me/33783453605" target="_blank" className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5" /> Ouvrir WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instagram Section */}
        <div className="mt-20 flex justify-center">
          <a
            href="https://instagram.com/the_brunch_strasbourg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow hover:shadow-lg transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/500px-Instagram_icon.png"
              alt="Instagram"
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-[#4a3b36] font-medium text-lg">@the_brunch_strasbourg</span>
          </a>
        </div>

      </div>
    </section>
  );
};
