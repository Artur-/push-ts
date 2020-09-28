package org.vaadin.artur.pushts.data.service;

import org.vaadin.artur.pushts.data.entity.Person;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import javax.annotation.Nullable;

public interface PersonRepository extends JpaRepository<Person, Integer> {

}