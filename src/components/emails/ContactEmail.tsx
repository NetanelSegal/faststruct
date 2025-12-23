import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  phone,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          <Text style={intro}>
            You have received a new message from your website contact form.
          </Text>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>
              <a href={`mailto:${email}`} style={link}>
                {email}
              </a>
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Phone:</Text>
            <Text style={value}>
              <a href={`tel:${phone}`} style={link}>
                {phone}
              </a>
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This email was sent from your website contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const intro = {
  color: '#666',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const section = {
  padding: '0 48px',
  marginBottom: '24px',
};

const label = {
  color: '#666',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const value = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
  lineHeight: '24px',
};

const link = {
  color: '#0066cc',
  textDecoration: 'none',
};

const messageText = {
  color: '#333',
  fontSize: '16px',
  margin: '0',
  lineHeight: '24px',
  whiteSpace: 'pre-wrap' as const,
  backgroundColor: '#f8f9fa',
  padding: '16px',
  borderRadius: '4px',
  border: '1px solid #e6ebf1',
};

const footer = {
  color: '#999',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '32px',
  padding: '0 48px',
};
