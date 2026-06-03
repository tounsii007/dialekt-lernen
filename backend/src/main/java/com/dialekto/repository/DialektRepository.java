package com.dialekto.repository;

import com.dialekto.domain.Dialekt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DialektRepository extends JpaRepository<Dialekt, String> {
}
