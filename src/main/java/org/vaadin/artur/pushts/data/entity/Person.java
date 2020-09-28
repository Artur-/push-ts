package org.vaadin.artur.pushts.data.entity;

import javax.persistence.Entity;

import org.vaadin.artur.pushts.data.AbstractEntity;
import java.time.LocalDate;
import javax.annotation.Nullable;

@Entity
public class Person extends AbstractEntity {

private String firstName;
public String getFirstName() {
  return firstName;
}
public void setFirstName(String firstName) {
  this.firstName = firstName;
}
private String lastName;
public String getLastName() {
  return lastName;
}
public void setLastName(String lastName) {
  this.lastName = lastName;
}
private String email;
public String getEmail() {
  return email;
}
public void setEmail(String email) {
  this.email = email;
}
private String phone;
public String getPhone() {
  return phone;
}
public void setPhone(String phone) {
  this.phone = phone;
}
@Nullable
private LocalDate dateOfBirth;
public LocalDate getDateOfBirth() {
  return dateOfBirth;
}
public void setDateOfBirth(LocalDate dateOfBirth) {
  this.dateOfBirth = dateOfBirth;
}
private String occupation;
public String getOccupation() {
  return occupation;
}
public void setOccupation(String occupation) {
  this.occupation = occupation;
}



}
