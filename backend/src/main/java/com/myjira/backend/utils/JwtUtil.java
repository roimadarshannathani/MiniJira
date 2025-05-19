package com.myjira.backend.utils;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private final String jwtSecret = "d35458df6d99ea0928fa8989697dd3fb956e531492fd9ab2016530ec7d3de3ac3ca42e6cb86d8149ad721d5fe20b98eae2d0b8e2615aa364b7ed4f3fe1a2ebdb67e00edba3f0b5dbc7fcadeefccde755c949abeeb4349b2e3fb49cc73a4aed15def17404697834e71c757f7ed6a9265a1acc2ff5c84d499bd38a7290403de0fd653a7476fb8894cccd0baf27c15ff327a83a19d4eababe2eaf3ccfbeb17d0bb6fd8319e940c65be0b1617062d4e732ba9ea53bdf45f70e3d9b43187e19f5fb26414dc86d7181130f971124bfc2136ecfc2ff3781b41111ac90c9d66ff27bc33a84271777a8c152e6d86312c00270bb84a5fba4fbbb771d33285e52284b8680d71e92ed3015ef2a9d41aff530338ed2016eb26220db699b937a89d3af33ed355703fba5e6c1fc8bf5e345ca55123fee0eb07073bf068520cddadc5c4f1181c2c5d595a6b96426d055f66a142fd156e70f61e7ddb8ae30191cd25dc32913987b75476425d44c43544732de230f989200d031712eefe91f68347181d3f5be034867609722f07362c987a6d43e1ef034d2529cb45c1826befd45f6d5a46d633ab0c78df98c14c545ba476e43ae03e1f417a1c989e01e80b2d8ee2653b7bfa4b74062ef0925470fb6f743b168ddeeb14ba56d1482023ad74e9b7aaf61eb7d2d5ff0458c6fa11e28ba3a3fb37c2efb1f05aa014cea0040218e0098747a0c69005716f2t";
    private final long jwtExpirationMs = 600000;

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}