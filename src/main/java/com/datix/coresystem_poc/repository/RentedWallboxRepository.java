package com.datix.coresystem_poc.repository;

import com.datix.coresystem_poc.entity.RentedWallbox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentedWallboxRepository extends JpaRepository<RentedWallbox, Long> {}