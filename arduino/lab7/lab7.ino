#include <WiFi.h>
#include <HTTPClient.h>

// ------------------------- W I F I ------------------------------------
const char *ssid = "WIFI-NETWORK-NAME";
const char *password = "XXXXXXXXXX";

// Fréquence du watchdog - Watchdog frequency
const int watchdog = 5000;
unsigned long previousMillis = millis();

// ---------------------- A R D U I N O -----------------------------
const int pinFotoCelda = 33;
const int pinLed1 = 18;
const int pinLed2 = 19;
const int pinLed3 = 21;
const int entradaBoton = 23;

int estadoBoton = LOW;
int ultimoEstadoBoton = LOW;
unsigned long ultimoDebounceTime = 0;
unsigned long debounceDelay = 200;

int valorLuz = 0;
int valorBoton = 0;
int valorMapeado = 0;
int ledsEncendidos;

void setup()
{
    pinMode(pinFotoCelda, INPUT);
    pinMode(entradaBoton, INPUT);
    pinMode(pinLed1, OUTPUT);
    pinMode(pinLed2, OUTPUT);
    pinMode(pinLed3, OUTPUT);

    Serial.begin(115200);
    WiFi.begin(ssid, password);
    delay(4000);

    while (WiFi.status() != WL_CONNECTED)
    { // Check for the connection
        delay(1000);
        Serial.println("Connecting to WiFi..");
    }
    // Imprime la dirección IP una vez conectado
    Serial.println("Conectado al WiFi con éxito!");
    Serial.print("Dirección IP: ");
    Serial.println(WiFi.localIP());
}

void loop()
{
    valorLuz = analogRead(pinFotoCelda);
    valorBoton = digitalRead(entradaBoton);
    valorMapeado = map(valorLuz, 0, 4095, 0, 1023);

    // Serial.println(valorLuz);
    Serial.println(valorMapeado);
    gestionarLeds(valorMapeado);
    gestionarBoton(valorBoton);

    delay(300);
}

void gestionarLeds(int valorLuz)
{
    if (valorLuz >= 502 && valorLuz < 753)
    {
        digitalWrite(pinLed1, HIGH);
        digitalWrite(pinLed2, LOW);
        digitalWrite(pinLed3, LOW);
        ledsEncendidos = 1;
        }
    else if (valorLuz >= 251 && valorLuz < 502)
    {
        digitalWrite(pinLed1, HIGH);
        digitalWrite(pinLed2, HIGH);
        digitalWrite(pinLed3, LOW);
        ledsEncendidos = 2;
    }
    else if (valorLuz < 251)
    {
        digitalWrite(pinLed1, HIGH);
        digitalWrite(pinLed2, HIGH);
        digitalWrite(pinLed3, HIGH);
        ledsEncendidos = 3;
    }
    else
    {
        digitalWrite(pinLed1, LOW);
        digitalWrite(pinLed2, LOW);
        digitalWrite(pinLed3, LOW);
        ledsEncendidos = 0;
    }
}

void gestionarBoton(int valorBoton)
{
    static bool solicitudEnviada = false; // Variable estática para rastrear si la solicitud ya se envió

    if (valorBoton != ultimoEstadoBoton)
    {
        ultimoDebounceTime = millis();
    }

    if ((millis() - ultimoDebounceTime) > debounceDelay)
    {
        if (valorBoton != estadoBoton)
        {
            estadoBoton = valorBoton;

            if (estadoBoton == HIGH && !solicitudEnviada)
            {                            // Verifica si el botón está presionado y la solicitud no se ha enviado
                solicitudEnviada = true; // Marca que la solicitud se va a enviar para no repetirla

                HTTPClient http;

                http.begin("http://{YOUR_IP_HOST}:3000/leds");
                http.addHeader("Content-Type", "application/json");

                String jsonData = "{\"number_leds\":" + String(ledsEncendidos) + "}";

                int httpResponseCode = http.POST(jsonData);

                if (httpResponseCode > 0)
                {
                    String response = http.getString();
                    Serial.println(httpResponseCode);
                    Serial.println(response);
                }
                else
                {
                    Serial.print("Error en la solicitud: ");
                    Serial.println(httpResponseCode);
                }

                http.end();
            }
            else if (estadoBoton == LOW)
            {
                solicitudEnviada = false;
            }
        }
    }
    ultimoEstadoBoton = valorBoton;
}
