# Aplicación Web Evangélica

Una aplicación web completa para iglesias evangélicas con funcionalidades de música cristiana, videos, testimonios, eventos y más.

## Características

- 🎵 **Música Cristiana**: Integración con Spotify y YouTube para contenido cristiano
- 📺 **Videos de Adoración**: Videos de YouTube de canales cristianos verificados
- 📖 **Biblia Interactiva**: Lectura de la Biblia con múltiples versiones
- 🙏 **Testimonios**: Compartir y leer testimonios de fe
- 📅 **Eventos**: Gestión de eventos y actividades de la iglesia
- 🎮 **Juegos Bíblicos**: Trivia y juegos educativos
- 📱 **Responsive**: Diseño adaptable para móviles y escritorio

## Configuración de APIs

### 1. YouTube API (para videos cristianos)

1. Ve a [Google Cloud Console](https://console.developers.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la YouTube Data API v3
4. Crea credenciales (API Key)
5. Agrega la clave a tu archivo `.env.local`:

\`\`\`env
NEXT_PUBLIC_YOUTUBE_API_KEY=tu_clave_de_youtube_aqui
\`\`\`

### 2. Spotify API (para música cristiana)

1. Ve a [Spotify for Developers](https://developer.spotify.com/dashboard/)
2. Crea una nueva aplicación
3. Obtén tu Client ID y Client Secret
4. Agrega las credenciales a tu archivo `.env.local`:

\`\`\`env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=tu_client_id_de_spotify
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=tu_client_secret_de_spotify
\`\`\`

### 3. Bible API (opcional)

1. Ve a [API.Bible](https://api.bible/)
2. Regístrate y obtén una API key
3. Agrega la clave a tu archivo `.env.local`:

\`\`\`env
BIBLE_API_KEY=tu_clave_de_bible_api
\`\`\`

## Instalación

1. Clona el repositorio:
\`\`\`bash
git clone [url-del-repositorio]
cd iglesia-web-app
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Copia el archivo de variables de entorno:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Configura las variables de entorno en `.env.local` con tus claves de API

5. Ejecuta la aplicación en modo desarrollo:
\`\`\`bash
npm run dev
\`\`\`

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Estructura del Proyecto

\`\`\`
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   ├── bible/             # Páginas de la Biblia
│   ├── music/             # Páginas de música
│   └── testimonies/       # Páginas de testimonios
├── components/            # Componentes React
│   ├── screens/          # Pantallas principales
│   ├── ui/               # Componentes UI (shadcn/ui)
│   └── auth-guard.tsx    # Protección de rutas
├── lib/                  # Utilidades y APIs
│   ├── bible-api.ts      # API de la Biblia
│   ├── music-api.ts      # API de música cristiana
│   └── api-config.ts     # Configuración de APIs
└── hooks/                # Custom hooks
\`\`\`

## Funcionalidades Principales

### Música y Videos Cristianos

- **Búsqueda inteligente**: Busca música y videos cristianos usando términos optimizados
- **Categorías**: Adoración, Alabanza, Contemporáneo, Gospel, Himnos
- **Integración con Spotify**: Acceso a millones de canciones cristianas
- **Videos de YouTube**: Contenido de canales cristianos verificados como Hillsong, Bethel Music, etc.
- **Playlists curadas**: Listas de reproducción temáticas

### Sistema de Autenticación

- **Registro y login**: Sistema de autenticación local
- **Protección de rutas**: Funcionalidades premium para usuarios registrados
- **Persistencia**: Sesión guardada en localStorage

### Contenido Bíblico

- **Múltiples versiones**: RVR1960, NVI, DHH y más
- **Búsqueda avanzada**: Busca por palabra, versículo o tema
- **Trivia bíblica**: Juegos educativos con preguntas bíblicas
- **Favoritos**: Guarda tus versículos favoritos

## Tecnologías Utilizadas

- **Next.js 14**: Framework de React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utilitarios
- **shadcn/ui**: Componentes UI modernos
- **Lucide React**: Iconos
- **YouTube Data API v3**: Videos cristianos
- **Spotify Web API**: Música cristiana
- **Bible API**: Contenido bíblico

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Si tienes preguntas o necesitas ayuda, por favor abre un issue en el repositorio.

---

**Nota**: Esta aplicación está diseñada específicamente para iglesias evangélicas y comunidades cristianas. El contenido está curado para mantener valores y principios cristianos.
