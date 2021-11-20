
export default function LatLon2XY(lat, lon, z) {
    let pi = 3.1415926535897932;
    let latrad = lat * pi / 180.0;
    let lonrad = lon * pi / 180.0;
    let a = 6378137.0;
    let k = 0.0818191908426;
    let f = Math.tan(pi / 4 + latrad / 2) / Math.pow(Math.tan(pi / 4 + Math.asin(k * Math.sin(latrad)) / 2), k);
    let flatX = Math.floor((20037508.342789 + a * lonrad) * 53.5865938 / Math.pow(2, (23 - z)));
    let flatY = Math.floor((20037508.342789 - a * Math.log(f)) * 53.5865938 / Math.pow(2, (23 - z)));
    let tilesX = Math.floor(flatX / 256);
    let tilesY = Math.floor(flatY / 256);
    let picX = flatX % 256;
    let picY = flatY % 256;

    return [tilesX, tilesY, picX, picY, flatX, flatY]
    // Выходные параметры:
    // номера тайлов по X и Y
    // координаты точки в тайле
    // координаты точки в плоскости проэкции Земли
}

//console.log(LatLon2XY(55.751244, 37.618423, 15));