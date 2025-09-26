# Configuração de Variáveis de Ambiente - Protego App

## Google Maps API Key

Para usar o mapa na tela de Localização, você precisa:

1. **Obter uma API Key do Google Maps:**
   - Acesse: https://console.cloud.google.com/
   - Crie um novo projeto ou selecione um existente
   - Ative a API "Maps SDK for Android" e "Maps SDK for iOS"
   - Vá em "Credenciais" > "Criar credenciais" > "Chave de API"
   - Copie sua API Key

2. **Configurar no app.json:**
   - Abra o arquivo `app.json`
   - Na seção `android.config.googleMaps.apiKey`, substitua `YOUR_GOOGLE_MAPS_API_KEY` pela sua API Key real
   - Exemplo: `"apiKey": "AIzaSyC4YfuuP6KRnEm1QqzKcvVNwYtKm5Xc"`

3. **Rebuild do projeto:**
   ```bash
   npx expo prebuild --clean
   npx expo run:android
   ```

## Exemplo de Configuração Correta no app.json
```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "AIzaSyBvOimt9GigjPFbBrHpiIIW38L_tcHi"
    }
  }
}
```

## Segurança
- Nunca commite a API Key real no Git
- Configure restrições de uso no Google Cloud Console
- Limite o uso apenas aos seus pacotes Android/iOS

## Troubleshooting
Se ainda tiver problemas:
1. Verifique se a API está habilitada no Google Cloud
2. Confirme que a API Key não tem restrições que impeçam o uso
3. Reconstrua o projeto com `expo prebuild --clean`