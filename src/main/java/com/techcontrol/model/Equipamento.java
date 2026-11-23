package com.techcontrol.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
@Entity
@Table(name="equipamentos",uniqueConstraints=@UniqueConstraint(columnNames="patrimonio"))
public class Equipamento {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Size(max=100) private String nome;
 @NotBlank @Size(max=40) private String tipo;
 @NotBlank @Column(nullable=false,unique=true,length=50) @Size(max=50) private String patrimonio;
 @Size(max=100) private String sistemaOperacional;
 @NotNull @Enumerated(EnumType.STRING) private Situacao situacao;
 @Size(max=500) private String observacoes;
 public enum Situacao { EM_USO, DISPONIVEL, MANUTENCAO }
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getNome(){return nome;} public void setNome(String v){nome=v;}
 public String getTipo(){return tipo;} public void setTipo(String v){tipo=v;}
 public String getPatrimonio(){return patrimonio;} public void setPatrimonio(String v){patrimonio=v;}
 public String getSistemaOperacional(){return sistemaOperacional;} public void setSistemaOperacional(String v){sistemaOperacional=v;}
 public Situacao getSituacao(){return situacao;} public void setSituacao(Situacao v){situacao=v;}
 public String getObservacoes(){return observacoes;} public void setObservacoes(String v){observacoes=v;}
}
