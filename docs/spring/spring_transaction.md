---
title: '@Transactional 스프링의 트랜잭션'
lang: 'ko-kr'
description: '스프링이 트랜잭션을 수행하기위해 어떤 요소들이 구현되었고 그것들이 어떻게 이용하는지 알아봅니다.'
layout: Layout
---

<!-- more -->

# @Transactional
스프링에서 지원하는 트랜잭션은 어떤 방식으로 동작하고 어떤순서로 어떤 구성을 갖는지를 알아봅니다.
지원되는 트랜잭션 방식은 여러가지 지만 이번엔 어노테이션 타입의 트랜잭션을 공부합니다.
먼저 공식문서를 통해 어떻게 정의 되어있는지 확인할게요.

## Opficial Docs
[원문 Transactional (Spring Framework 5.3.9 API)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/Transactional.html)

### 어노테이션 타입

```java
@Target(value={TYPE,METHOD})
@Retention(value=RUNTIME)
@Inherited
@Documented
public @interface Transactional
```

개별 메소드 또는 클래스에 트랜잭션 속성을 표시하는 어노테이션 입니다.

이 어노테이션이 클래스 레벨에 선언되면, 해당 서브클래스와 선언된 클래스의 모든 메서드는 기본적으로 적용됩니다. 이 어노테이션은 클래스 계층의 조상 클래스에는 적용되지 않습니다. 상속된 메소드는 서브클래스 어노테이션 안에서 참여하기 위해 지역적으로 재선언될 필요가 있습니다. 메소드의 가시성 제약에대한 자세한 사항은 수동 참조의 [Transaction Management](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#transaction)를 참조하세요.

이 어노테이션 타입은 일반적으로 스프링의 [RuleBasedTransactionAttribute](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/interceptor/RuleBasedTransactionAttribute.html)클래스를 직접 비교할 수 있고, 실제로 [AnnotationTransactionAttributeSource](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/AnnotationTransactionAttributeSource.html)가 후자 클래스에 데이터를 바로 변환 하므로 스프링의 트랜잭션 지원 코드는 이 어노테이션에 대해 알 필요가 없어요. 사용자가 만든 롤백 룰이 적용되지 않는 다면, 트랜잭션은 예외를 체크하지 않지만, RuntimeException 과 Error에서 롤백 합니다. 어노테이션 속성 의미의 자세한 정보는
[TransactionDefinition](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/TransactionDefinition.html)와 [TransactionAttribute](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/interceptor/TransactionAttribute.html)를 참조하세요.

이 어노테이션은 일반적으로 현재 실행 쓰레드 내에서 모든 데이터 엑세스를 작업할 트랜잭션을 표시하여, [PlatformTransactionManager](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/PlatformTransactionManager.html)
에서 관리되는 쓰레드가 처리 해야하는 트랜잭션과 함께 작동합니다. **참고: 이 어노테이션은 메소드 내에서 새롭게 시작하는 쓰레드를 전파하지 않음.**

또는 이 어노테이션은 쓰레드로컬 변수 대신에 리액터 컨텍스트를 사용하는 [ReactiveTransactionManager](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/ReactiveTransactionManager.html)가 관리하는 리액티브 트랜잭션을 구분할 수 있어요. 결과적으로, 모든 참여 데이터 엑세스 작업은 동일한 리액티브 파이프라인의 동일한 리액터 컨텍스트 내에서 실행해야 합니다.


## 속성과 트랜잭션의 도우미들

### 시작하며

위의 문서에서 트랜잭션 어노테이션이 대충 어떤 역할을 하는지 알아봤어요. 이제는 각 속성과 구현체들이 어떤 역할을 하는지 알아보려 합니다. 먼저 트랜잭션을 대표하는 속성들이 내부적으로 어떻게 동작하는지 확인하고, 구현체들을 공부할 거에요.

트랜잭션에는 몇가지 속성이 있습니다. 그 속성을 이용해 해당 트랜잭션이 올바른 역할을 수행할 수있고 올바른 결과를 반환할 수 있도록 도와주는 속성들을 알아 봅니다. 위 공식문서의 [TransactionDefinition](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/TransactionDefinition.html) 인터페이스에 정의되어있는 Isolation과 Propagation을 알아봅니다.

### Propagation

* **REQUIRED**
현재 트랜잭션을 지원하고, 존재하지 않는다면 새로운 트랜잭션을 생성합니다. 같은 이름의 EJB 트랜잭션 속성과 유사합니다. 이것은 일반적으로 트랜잭션 정의의 기본설정이며, 일반적으로 트랜잭션 동기화 범위을 정의합니다.

 * **SUPPORTS**
현재 트랜잭션을 지원하며, 존재하지 않는다면 트랜잭션 없이 실행합니다. 같은 이름의 EJB 트랜잭션 속성과 유사합니다.
참고 : 트랜잭션 동기화가 있는 트랜잭션 매니저의 경우 SUPPORTS는 동기화가 적용되는 트랜잭션 범위를 정의하므로 트랜잭션이 없는 것과 약간 다릅니다. 결과적으로, 같은 자원(JDBC 연결, Hibernate 세션 등등)은 지정된 전체 범위를 위해 공유 됩니다. 참고로 이건 트랜잭션 매니저의 실제 동기화 구성에 의존합니다.

* **NOT_SUPPORTED**
현재 트랜잭션을 지원하지 않습니다. 오히려 항상 트랜잭션이 없이 실행합니다. 같은이름의 EJB 트랜잭션 속성과 유사합니다.
참고: 실제 트랜잭션 중단은 모든 트랜잭션 매니저에서 기본적으로 동작하지 않아요. 이건 특히 `org.springframework.transaction.jta.JtaTransactionManager`에 적용 되며,  `javax.transaction.TransactionManager `를 사용할 수 있어야 합니다. (표준자바 EE 에서).
참고로 트랜잭션 동기화는 `PROPAGATION_NOT_SUPPORTED`영역 내에서 사용할 수 없습니다. 존재하는 동기화는 적절하게 중단되고 재개 됩니다.
