Object.defineProperty(Object.prototype,"extend",{value:function(t){var e=this,r=Array.prototype.slice.call(arguments,1);return function(){e.apply(this,r),t.apply(this,arguments)}}});
code=[
	{
		type:'data/variable',
		value:'Object',
		do:{
			type:'operator/member/0',
			ind:{
				type:'attribute',
				value:'defineProperty',
				do:{
					type:'housing/call',
					ind:{
						type:'args/call',
						value:[
							{
								type:'data/variable',
								value:'Object',
								do:{
									type:'operator/member/0',
									ind:{
										type:'attribute',
										value:'defineProperty',
										do:'return'
									}
								}
							},
							{
								type:'data/string',
								value:"extend",
								do:'return'
							},
							{
								type:'data/object',
								value:[
									{
										type:'data/label',
										value:'value',
										ind:{
											type:'data/function',
											ind:{
												type:'args/declare',
												value:[
													{
														type:'data/string',
														value:'t'
													}
												]
											}
											dep:{
												type:'housing/block',
												code:[
													{
														type:'statement',
														value:'var',
														ind:{
															type:'data/variable',
															value:'e',
															do:{
																type:'operator/assignment/0',
																ind:{
																	type:'data/variable',
																	value:'this',
																	do:'return'
																}
															},
															after:{
																type:'operator/comma/0',
																ind:{
																	type:'data/variable',
																	value:'r',
																	do:{
																		type:'operator/assignment/0',
																		ind:{
																			type:'data/variable',
																			value:'Array',
																			do:{
																				type:'operator/member/0',
																				ind:{
																					type:'attribute',
																					value:'prototype',
																					do:{
																						type:'operator/member/0',
																						ind:{
																							type:'attribute',
																							value:'slice',
																							do:{
																								type:'operator/member/0',
																								ind:{
																									type:'attribute',
																									value:'call',
																									do:{
																										type:'housing/call',
																										ind:{
																											type:'args/call',
																											value:[
																												{
																													type:'data/variable',
																													value:'arguments',
																													do:'return'
																												},
																												{
																													type:'data/number',
																													value:'1',
																													do:'return'
																												}
																											]
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														},
													},
													{
														type:'statement',
														value:'return',
														ind:{
															type:'data/function',
															ind:{
																type:'args/declare',
																value:[]
															},
															dep:{
																type:'housing/block',
																code:[
																	{
																		type:'data/variable',
																		value:'e',
																		do:{
																			type:'operator/member/0',
																			ind:{
																				type:'attribute',
																				value:'apply',
																				do:{
																					type:'housing/call',
																					ind:{
																						type:'args/call',
																						value:[
																							{
																								type:'data/variable',
																								value:'this',
																								do:'return'
																							},
																							{
																								type:'data/variable',
																								value:'r',
																								do:'return'
																							}
																						]
																					}
																				}
																			}
																		}
																		after:{
																			type:'operator/comma/0',
																			ind:{
																				type:'data/variable',
																				value:'t',
																				do:{
																					type:'operator/member/0',
																					ind:{
																						type:'attribute',
																						value:'apply',
																						do:{
																							type:'housing/call',
																							ind:{
																								type:'args/call',
																								value:[
																									{
																										type:'data/variable',
																										value:'this',
																										do:'return'
																									},
																									{
																										type:'data/variable',
																										value:'arguments',
																										do:'return'
																									}
																								]
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																]
															}
														}
													}
												]
											}
										}
									}
								]
							}
						]
					}
				}
			}
		}
	}
]