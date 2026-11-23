package com.techcontrol.repository;
import com.techcontrol.model.Equipamento;
import org.springframework.data.jpa.repository.JpaRepository;
public interface EquipamentoRepository extends JpaRepository<Equipamento,Long> { boolean existsByPatrimonio(String patrimonio); boolean existsByPatrimonioAndIdNot(String patrimonio,Long id); }
