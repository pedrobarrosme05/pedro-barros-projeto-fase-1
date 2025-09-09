import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Code as CodeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const AboutPage = () => {
  const technologies = [
    { name: 'React', version: '19.1.1', color: 'primary' },
    { name: 'Material-UI', version: '6.1.8', color: 'secondary' },
    { name: 'React Router', version: '7.8.2', color: 'success' },
    { name: 'Axios', version: '1.7.9', color: 'info' },
    { name: 'Vite', version: '7.1.2', color: 'warning' },
    { name: 'Vitest', version: '3.2.4', color: 'error' },
  ];

  const features = [
    'Cadastro completo de séries com validação de formulário',
    'Listagem dinâmica com busca e filtros avançados',
    'Edição e exclusão de séries em tempo real',
    'Interface responsiva e intuitiva com Material Design',
    'Navegação fluida entre páginas com React Router',
    'Consumo de API REST com tratamento de erros',
    'Testes unitários e funcionais implementados',
    'Notificações de sucesso e erro para o usuário',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h1" component="h1" color="primary" gutterBottom>
          Sobre o SeriesManager
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Projeto desenvolvido para a disciplina de Desenvolvimento Frontend
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Descrição do Projeto */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h2" gutterBottom>
                <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                O que é o SeriesManager?
              </Typography>
              <Typography variant="body1" paragraph>
                O SeriesManager é uma aplicação web moderna desenvolvida em React que permite aos usuários 
                gerenciar suas séries assistidas de forma organizada e eficiente. O projeto foi desenvolvido 
                seguindo as melhores práticas de desenvolvimento frontend, utilizando tecnologias modernas 
                e padrões de design responsivo.
              </Typography>
              <Typography variant="body1" paragraph>
                A aplicação consome uma API REST para realizar operações CRUD (Create, Read, Update, Delete) 
                nas séries, proporcionando uma experiência dinâmica e em tempo real para o usuário.
              </Typography>
            </CardContent>
          </Card>

          {/* Funcionalidades */}
          <Card>
            <CardContent>
              <Typography variant="h2" gutterBottom>
                Funcionalidades Implementadas
              </Typography>
              <List>
                {features.map((feature, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Tecnologias */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                Tecnologias Utilizadas
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={`${tech.name} v${tech.version}`}
                    color={tech.color}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Arquitetura */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                Arquitetura do Projeto
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText
                    primary="Frontend"
                    secondary="React com Material-UI para interface"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="API"
                    secondary="REST API em Node.js para dados"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Testes"
                    secondary="Vitest para testes unitários"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Build"
                    secondary="Vite para desenvolvimento e build"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Desenvolvedor */}
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                <PersonIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h3" gutterBottom>
                Desenvolvido por
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                Pedro Barros
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Projeto Fase 2 - Desenvolvimento Frontend
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PUCRS Online - 2025
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer Info */}
      <Box sx={{ mt: 6, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h3" textAlign="center" gutterBottom>
          Fase 2 do Projeto
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary">
          Esta é a implementação da Fase 2 do projeto, que inclui a integração com API REST, 
          uso de Material-UI para estilização, implementação de testes e todas as funcionalidades 
          dinâmicas requisitadas.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;