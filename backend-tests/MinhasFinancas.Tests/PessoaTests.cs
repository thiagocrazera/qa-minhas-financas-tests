using Xunit;
using MinhasFinancas.Domain.Entities;

public class PessoaTests
{
    [Fact]
    public void Deve_Retornar_False_Para_Menor_De_Idade()
    {
        var pessoa = new Pessoa
        {
            Nome = "Teste",
            DataNascimento = DateTime.Today.AddYears(-15)
        };

        Assert.False(pessoa.EhMaiorDeIdade());
    }

    [Fact]
    public void Deve_Retornar_True_Para_Maior_De_Idade()
    {
        var pessoa = new Pessoa
        {
            Nome = "Teste",
            DataNascimento = DateTime.Today.AddYears(-20)
        };

        Assert.True(pessoa.EhMaiorDeIdade());
    }

    [Fact]
    public void Deve_Retornar_True_Para_Pessoa_Que_Faz_18_Anos_Hoje()
    {
        var pessoa = new Pessoa
        {
            Nome = "Teste",
            DataNascimento = DateTime.Today.AddYears(-18)
        };

        Assert.True(pessoa.EhMaiorDeIdade());
    }

    [Fact]
    public void Deve_Retornar_False_Para_Pessoa_Que_Faz_18_Anos_Amanha()
    {
        var pessoa = new Pessoa
        {
            Nome = "Teste",
            DataNascimento = DateTime.Today.AddYears(-18).AddDays(1)
        };

        Assert.False(pessoa.EhMaiorDeIdade());
    }

    [Fact]
    public void Deve_Calcular_Idade_Corretamente()
    {
        var pessoa = new Pessoa
        {
            Nome = "Teste",
            DataNascimento = DateTime.Today.AddYears(-25)
        };

        Assert.Equal(25, pessoa.Idade);
    }
}