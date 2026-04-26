using Xunit;
using MinhasFinancas.Domain.Entities;

public class PessoaTests
{
    [Fact]
    public void Deve_Retornar_False_Para_Menor_De_Idade()
    {
        // Arrange
        var pessoa = new Pessoa
        {
            Nome = "Teste",
            DataNascimento = DateTime.Today.AddYears(-15)
        };

        // Act
        var resultado = pessoa.EhMaiorDeIdade();

        // Assert
        Assert.False(resultado);
    }

    [Fact]
    public void Deve_Retornar_True_Para_Maior_De_Idade()
    {
        // Arrange
        var pessoa = new Pessoa
        {
            Nome = "Teste",
            DataNascimento = DateTime.Today.AddYears(-20)
        };

        // Act
        var resultado = pessoa.EhMaiorDeIdade();

        // Assert
        Assert.True(resultado);
    }
}