#!/bin/bash

# Script para insertar libros de prueba en la API de Biblioteca
# Uso: bash INSERTAR_LIBROS_PRUEBA.sh

API_URL="http://localhost:8000/api"

echo "================================"
echo "Insertando Libros de Prueba"
echo "================================"
echo ""

# Función para insertar un libro
insertar_libro() {
    local nombre=$1
    local autor=$2
    local descripcion=$3
    local fecha=$4
    local cantidad=$5

    echo "Insertando: $nombre"

    curl -X POST "${API_URL}/libro/crear/" \
      -H "Content-Type: application/json" \
      -d "{
        \"nombre_libro\": \"$nombre\",
        \"autor\": \"$autor\",
        \"descripcion\": \"$descripcion\",
        \"fecha_publicacion\": \"$fecha\",
        \"total_libros\": $cantidad,
        \"status\": true
      }" \
      -s | jq '.'

    echo ""
}

# Insertar libros de prueba
insertar_libro \
    "El Quijote" \
    "Miguel de Cervantes" \
    "Una novela clásica de la literatura española sobre las aventuras de un caballero andante" \
    "1605-01-16" \
    5

insertar_libro \
    "Cien Años de Soledad" \
    "Gabriel García Márquez" \
    "Una obra maestra de la literatura latinoamericana que cuenta la historia de la familia Buendía" \
    "1967-05-30" \
    3

insertar_libro \
    "1984" \
    "George Orwell" \
    "Una novela distópica sobre un régimen totalitario y la lucha por la libertad" \
    "1949-06-08" \
    7

insertar_libro \
    "Orgullo y Prejuicio" \
    "Jane Austen" \
    "Una novela romántica del siglo XIX que explora temas de amor y clase social" \
    "1813-01-28" \
    4

insertar_libro \
    "Don Quijote de la Mancha (Parte II)" \
    "Miguel de Cervantes" \
    "La segunda parte de las aventuras del ingenioso caballero Don Quijote" \
    "1615-10-27" \
    2

insertar_libro \
    "Crimen y Castigo" \
    "Fiódor Dostoiévski" \
    "Una novela psicológica sobre un estudiante que comete un crimen y sus consecuencias morales" \
    "1866-01-01" \
    6

insertar_libro \
    "Jane Eyre" \
    "Charlotte Brontë" \
    "La historia de una joven institutriz que se convierte en una mujer independiente" \
    "1847-10-19" \
    3

insertar_libro \
    "El Conde de Montecristo" \
    "Alexandre Dumas" \
    "Una novela de aventuras sobre un hombre injustamente encarcelado que busca venganza" \
    "1844-08-28" \
    4

insertar_libro \
    "Mujercitas" \
    "Louisa May Alcott" \
    "Una novela sobre cuatro hermanas y sus experiencias durante la Guerra Civil Americana" \
    "1869-10-01" \
    5

insertar_libro \
    "Las Aventuras de Sherlock Holmes" \
    "Arthur Conan Doyle" \
    "Una colección de historias de detectives sobre el famoso detective Sherlock Holmes" \
    "1892-03-14" \
    8

echo "================================"
echo "¡Libros insertados exitosamente!"
echo "================================"
echo ""
echo "Puedes verificar los libros en:"
echo "- Frontend: http://localhost:5173/admin/dashboard"
echo "- API: curl http://localhost:8000/api/libro/obtener/"
