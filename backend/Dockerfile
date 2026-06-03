# ---- Build-Stage: Maven + JDK 21 ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
# Abhängigkeiten zuerst (eigener Cache-Layer — ändert sich selten).
COPY pom.xml .
RUN mvn -B -q dependency:go-offline
COPY src ./src
RUN mvn -B -q clean package -DskipTests

# ---- Runtime-Stage: schlankes JRE 21, non-root ----
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app
# Unprivilegierten Nutzer anlegen (kein root im Container).
RUN addgroup -S app && adduser -S -G app app
COPY --from=build /app/target/*.jar app.jar
USER app
EXPOSE 8080
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
