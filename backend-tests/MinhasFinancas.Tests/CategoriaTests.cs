using Xunit;
using MinhasFinancas.Domain.Entities;
 
public class CategoriaTests
{
    // ── Finalidade: Despesa ──────────────────────────────────────
 
    [Fact]
    public void Categoria_De_Despesa_Deve_Permitir_Transacao_De_Despesa()
    {
        var categoria = new Categoria { Finalidade = Categoria.EFinalidade.Despesa };
 
        Assert.True(categoria.PermiteTipo(Transacao.ETipo.Despesa));
    }
 
    [Fact]
    public void Categoria_De_Despesa_Nao_Deve_Permitir_Transacao_De_Receita()
    {
        var categoria = new Categoria { Finalidade = Categoria.EFinalidade.Despesa };
 
        Assert.False(categoria.PermiteTipo(Transacao.ETipo.Receita));
    }
 
    // ── Finalidade: Receita ──────────────────────────────────────
 
    [Fact]
    public void Categoria_De_Receita_Deve_Permitir_Transacao_De_Receita()
    {
        var categoria = new Categoria { Finalidade = Categoria.EFinalidade.Receita };
 
        Assert.True(categoria.PermiteTipo(Transacao.ETipo.Receita));
    }
 
    [Fact]
    public void Categoria_De_Receita_Nao_Deve_Permitir_Transacao_De_Despesa()
    {
        var categoria = new Categoria { Finalidade = Categoria.EFinalidade.Receita };
 
        Assert.False(categoria.PermiteTipo(Transacao.ETipo.Despesa));
    }
 
    // ── Finalidade: Ambas ────────────────────────────────────────
 
    [Fact]
    public void Categoria_Ambas_Deve_Permitir_Transacao_De_Despesa()
    {
        var categoria = new Categoria { Finalidade = Categoria.EFinalidade.Ambas };
 
        Assert.True(categoria.PermiteTipo(Transacao.ETipo.Despesa));
    }
 
    [Fact]
    public void Categoria_Ambas_Deve_Permitir_Transacao_De_Receita()
    {
        var categoria = new Categoria { Finalidade = Categoria.EFinalidade.Ambas };
 
        Assert.True(categoria.PermiteTipo(Transacao.ETipo.Receita));
    }
}